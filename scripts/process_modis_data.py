#!/usr/bin/env python3
"""
MODIS Chlorophyll Data Processing Script
Processes MODIS, SST, and SSHA data for web visualization
Implements SHARK Gaussian Model with multi-depth support
"""

import os
import json
import netCDF4 as nc
import numpy as np
import pandas as pd
from scipy.ndimage import zoom
from scipy.interpolate import griddata

# Configuration
CHLOR_DIR = "../MODIS DATA/drive-download-20251005T034719Z-1-001"
SST_NC = "../ct5km_baa5_v3.1_20250101.nc"
SSHA_CSV = "../SSHA.10-day.20250102.bbox=85,2,-85,-3.csv"
OUTPUT_DIR = "../public/processed-data"
DEPTHS = [50, 100, 150, 200, 250, 300]  # Depth levels in meters

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

def lapse_rate(lat):
    """Calculate latitude-dependent temperature lapse rate"""
    return 0.02 + 0.01 * np.sin(np.radians(lat))**2  # °C/m

def shark_gaussian_model(sst, ssha, chl, lat, lon, depth,
                         mu_sst=24.0, sigma_sst=2.5,
                         mu_ssha=50.0, sigma_ssha=30.0,
                         mu_chl=0.5, sigma_chl=0.3,
                         weights=[0.4, 0.2, 0.4]):
    """
    SHARK Gaussian Model with depth adjustment
    
    Parameters:
    - depth: Depth in meters (50-300m)
    """
    chl_log = np.log(np.maximum(chl, 1e-3))
    lapse = lapse_rate(lat)
    
    # DEPTH ADJUSTMENT - This is the key change!
    sst_adjusted = sst - lapse * depth
    
    # Arctic suppression - filter out temperatures below 18.1°C
    sst_adjusted = np.where(sst_adjusted <= 18.1, np.nan, sst_adjusted)
    
    # Calculate component scores
    sst_score = np.exp(-((sst_adjusted - mu_sst)**2) / (2 * sigma_sst**2))
    sst_score = np.where(np.isnan(sst_adjusted), 0.0, sst_score)
    
    ssha_score = np.exp(-((ssha - mu_ssha)**2) / (2 * sigma_ssha**2))
    chl_score = np.exp(-((chl_log - np.log(mu_chl))**2) / (2 * sigma_chl**2))
    
    # Weighted combination
    Bp = weights[0]*sst_score + weights[1]*ssha_score + weights[2]*chl_score
    return np.clip(Bp, 0, 1)

def log_linear_transformation(Bp, beta0=0.0, beta1=2.0):
    """Apply log-linear transformation to get intensity"""
    epsilon = np.random.normal(loc=0.0, scale=0.05, size=Bp.shape)
    lambda_map = np.exp(beta0 + beta1 * Bp + epsilon)
    return lambda_map

def process_modis_data():
    """Main processing function"""
    print("=" * 80)
    print("MODIS DATA PROCESSING FOR WEB VISUALIZATION")
    print("=" * 80)
    
    # 1. Load chlorophyll data
    print("\n📊 Loading chlorophyll data...")
    chlor_dir_full = os.path.join(os.path.dirname(__file__), CHLOR_DIR)
    files = sorted([f for f in os.listdir(chlor_dir_full) if f.endswith('.nc') and not f.endswith('.part')])
    
    if not files:
        print("❌ No valid NetCDF files found!")
        return
    
    print(f"   Found {len(files)} NetCDF files")
    print(f"   Using: {files[0]}")
    
    ds = nc.Dataset(os.path.join(chlor_dir_full, files[0]))
    chlor = ds.variables['chlor_a'][:]
    modis_lat = ds.variables['lat'][:]
    modis_lon = ds.variables['lon'][:]
    
    # Downsample for web performance
    print("   Downsampling chlorophyll (20x)...")
    chlor_ds = chlor[::20, ::20]
    modis_lat_ds = modis_lat[::20]
    modis_lon_ds = modis_lon[::20]
    lon_modis_grid, lat_modis_grid = np.meshgrid(modis_lon_ds, modis_lat_ds)
    
    # 2. Load SST proxy
    print("\n🌡️  Loading SST proxy...")
    sst_nc_full = os.path.join(os.path.dirname(__file__), SST_NC)
    sst_ds = nc.Dataset(sst_nc_full)
    baa = np.squeeze(sst_ds.variables['bleaching_alert_area'][:])
    baa_lat = sst_ds.variables['lat'][:]
    baa_lon = sst_ds.variables['lon'][:]
    
    # Estimate SST from bleaching alert area
    sst_proxy = 26 + (np.where((baa == 251) | (baa == 0), np.nan, baa) / 7) * 6
    sst_proxy = np.clip(sst_proxy, 18, 32)
    
    # Downsample SST
    print("   Downsampling SST (20x)...")
    sst_ds_grid = sst_proxy[::20, ::20]
    baa_lat_ds = baa_lat[::20]
    baa_lon_ds = baa_lon[::20]
    lon_baa_grid, lat_baa_grid = np.meshgrid(baa_lon_ds, baa_lat_ds)
    
    # 3. Resample chlorophyll to SST grid
    print("\n🔄 Resampling chlorophyll to SST grid...")
    scale_y = sst_ds_grid.shape[0] / chlor_ds.shape[0]
    scale_x = sst_ds_grid.shape[1] / chlor_ds.shape[1]
    chlor_resampled = zoom(chlor_ds, (scale_y, scale_x), order=1)
    
    # 4. Load and interpolate SSHA
    print("\n🌊 Loading SSHA data...")
    ssha_csv_full = os.path.join(os.path.dirname(__file__), SSHA_CSV)
    ssha_df = pd.read_csv(ssha_csv_full)
    ssha_df.columns = [col.strip().replace(',', '') for col in ssha_df.columns]
    ssha_df = ssha_df[ssha_df['Data Value'].between(-500, 500)]
    
    points = ssha_df[['Longitude', 'Latitude']].values
    values = ssha_df['Data Value'].values
    ssha_raw = griddata(points, values, (lon_baa_grid, lat_baa_grid), method='linear')
    
    # Normalize SSHA
    ssha_mean = np.nanmean(ssha_raw)
    ssha_std = np.nanstd(ssha_raw)
    ssha_resampled = (ssha_raw - ssha_mean) / ssha_std * 50 + 50
    
    # 5. Fix orientation if needed
    if baa_lat_ds[0] > baa_lat_ds[-1]:
        print("\n🔧 Fixing inverted latitude orientation...")
        baa_lat_ds = baa_lat_ds[::-1]
        lat_baa_grid = np.flipud(lat_baa_grid)
        sst_ds_grid = np.flipud(sst_ds_grid)
        chlor_resampled = np.flipud(chlor_resampled)
        ssha_resampled = np.flipud(ssha_resampled)
    
    # 6. Process for each depth level
    print(f"\n🧠 Computing SHARK model for {len(DEPTHS)} depth levels...")
    depth_results = {}
    
    for depth in DEPTHS:
        print(f"   Processing depth: {depth}m")
        
        # Compute probability
        Bp = shark_gaussian_model(sst_ds_grid, ssha_resampled, chlor_resampled,
                                  lat_baa_grid, lon_baa_grid, depth)
        
        # Apply log-linear transformation
        lambda_map = log_linear_transformation(Bp)
        
        # Sample data for web (every 5th point to reduce size)
        sample_indices_y = slice(0, lambda_map.shape[0], 5)
        sample_indices_x = slice(0, lambda_map.shape[1], 5)
        
        sampled_intensity = lambda_map[sample_indices_y, sample_indices_x]
        sampled_lat = lat_baa_grid[sample_indices_y, sample_indices_x]
        sampled_lon = lon_baa_grid[sample_indices_y, sample_indices_x]
        sampled_chlor = chlor_resampled[sample_indices_y, sample_indices_x]
        sampled_sst = sst_ds_grid[sample_indices_y, sample_indices_x]
        
        # Create data points (non-NaN only)
        data_points = []
        for i in range(sampled_intensity.shape[0]):
            for j in range(sampled_intensity.shape[1]):
                if not np.isnan(sampled_intensity[i, j]):
                    data_points.append({
                        'lat': float(sampled_lat[i, j]),
                        'lon': float(sampled_lon[i, j]),
                        'intensity': float(sampled_intensity[i, j]),
                        'probability': float(Bp[i*5, j*5]),
                        'chlorophyll': float(sampled_chlor[i, j]) if not np.isnan(sampled_chlor[i, j]) else 0.0,
                        'sst': float(sampled_sst[i, j]) if not np.isnan(sampled_sst[i, j]) else 0.0,
                    })
        
        depth_results[str(depth)] = {
            'depth': depth,
            'data': data_points,
            'stats': {
                'mean_intensity': float(np.nanmean(lambda_map)),
                'mean_probability': float(np.nanmean(Bp)),
                'mean_chlorophyll': float(np.nanmean(chlor_resampled)),
                'mean_sst': float(np.nanmean(sst_ds_grid)),
                'count': len(data_points)
            }
        }
        
        print(f"      ✓ {len(data_points)} data points generated")
    
    # 7. Save results
    print("\n💾 Saving processed data...")
    output_file = os.path.join(os.path.dirname(__file__), OUTPUT_DIR, 'modis-shark-model.json')
    
    output_data = {
        'metadata': {
            'source_file': files[0],
            'processing_date': pd.Timestamp.now().isoformat(),
            'depths': DEPTHS,
            'grid_size': {
                'lat': len(baa_lat_ds),
                'lon': len(baa_lon_ds)
            },
            'bounds': {
                'lat_min': float(np.min(baa_lat_ds)),
                'lat_max': float(np.max(baa_lat_ds)),
                'lon_min': float(np.min(baa_lon_ds)),
                'lon_max': float(np.max(baa_lon_ds))
            }
        },
        'depths': depth_results
    }
    
    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)
    
    file_size_mb = os.path.getsize(output_file) / (1024 * 1024)
    print(f"   ✓ Saved to: {output_file}")
    print(f"   ✓ File size: {file_size_mb:.2f} MB")
    
    # Print summary
    print("\n" + "=" * 80)
    print("PROCESSING COMPLETE ✅")
    print("=" * 80)
    print(f"Depth levels processed: {', '.join(map(str, DEPTHS))}")
    print(f"Total data points: {sum(len(depth_results[str(d)]['data']) for d in DEPTHS):,}")
    print(f"Output file: {output_file}")
    print("\nReady for web integration!")
    
if __name__ == '__main__':
    try:
        process_modis_data()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
