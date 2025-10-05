#!/usr/bin/env python3
"""
Generate synthetic MODIS-like data for shark foraging prediction
Based on real oceanographic patterns and distributions
"""

import json
import numpy as np
from datetime import datetime

def generate_synthetic_modis_data():
    """Generate realistic synthetic MODIS data matching the expected structure"""
    
    # Define ocean hotspot regions (based on real shark foraging zones)
    hotspots = [
        # Gulf Stream
        {"lat_center": 35, "lon_center": -70, "intensity": 2.5, "spread": 10},
        # California Current
        {"lat_center": 35, "lon_center": -125, "intensity": 2.3, "spread": 8},
        # Kuroshio Current
        {"lat_center": 35, "lon_center": 140, "intensity": 2.4, "spread": 9},
        # Agulhas Current
        {"lat_center": -35, "lon_center": 25, "intensity": 2.2, "spread": 8},
        # Peru Current
        {"lat_center": -15, "lon_center": -80, "intensity": 2.6, "spread": 7},
        # Equatorial Pacific
        {"lat_center": 0, "lon_center": -140, "intensity": 2.1, "spread": 15},
        # East Australian Current
        {"lat_center": -30, "lon_center": 155, "intensity": 2.0, "spread": 8},
        # Canary Current
        {"lat_center": 25, "lon_center": -20, "intensity": 1.9, "spread": 7},
    ]
    
    depths = [50, 100, 150, 200, 250, 300]
    
    data = {
        "metadata": {
            "source_file": "Synthetic_MODIS_Data_v1.0",
            "processing_date": datetime.now().isoformat(),
            "depths": depths,
            "grid_size": {"lat": 180, "lon": 360},
            "bounds": {
                "lat_min": -89.0,
                "lat_max": 89.0,
                "lon_min": -179.0,
                "lon_max": 179.0
            },
            "note": "Synthetic data based on real oceanographic patterns"
        },
        "depths": {}
    }
    
    for depth_idx, depth in enumerate(depths):
        depth_factor = 1.0 - (depth_idx * 0.12)  # Intensity decreases with depth
        points = []
        
        # Generate points around each hotspot
        for hotspot in hotspots:
            num_points = int(80 * depth_factor)  # Fewer points at greater depths
            
            for _ in range(num_points):
                # Generate points with Gaussian distribution around hotspot center
                lat = np.random.normal(hotspot["lat_center"], hotspot["spread"])
                lon = np.random.normal(hotspot["lon_center"], hotspot["spread"])
                
                # Clip to valid ranges
                lat = np.clip(lat, -85, 85)
                lon = np.clip(lon, -180, 180)
                
                # Calculate distance from hotspot center (for intensity calculation)
                dist = np.sqrt((lat - hotspot["lat_center"])**2 + 
                              (lon - hotspot["lon_center"])**2)
                
                # Intensity decreases with distance from center
                base_intensity = hotspot["intensity"] * np.exp(-dist / (hotspot["spread"] * 2))
                intensity = base_intensity * depth_factor * np.random.uniform(0.8, 1.2)
                intensity = max(1.0, intensity)  # Minimum intensity of 1.0
                
                # Probability from intensity (inverse exponential)
                probability = 1.0 - np.exp(-intensity + 1.0)
                probability = np.clip(probability, 0.1, 0.95)
                
                # SST: warmer near equator, cooler at poles
                base_sst = 28 - abs(lat) * 0.3
                sst = base_sst + np.random.normal(0, 2)
                sst = np.clip(sst, 16, 30)  # Realistic SST range for shark habitats
                
                # Chlorophyll: higher in upwelling zones and coastal areas
                base_chl = 0.5 + (intensity - 1.0) * 0.8
                chlorophyll = base_chl * np.random.lognormal(0, 0.5)
                chlorophyll = np.clip(chlorophyll, 0.1, 5.0)
                
                points.append({
                    "lat": round(lat, 4),
                    "lon": round(lon, 4),
                    "intensity": round(intensity, 4),
                    "probability": round(probability, 4),
                    "chlorophyll": round(chlorophyll, 4),
                    "sst": round(sst, 2)
                })
        
        # Add some background/baseline points (lower intensity)
        num_background = int(150 * depth_factor)
        for _ in range(num_background):
            lat = np.random.uniform(-70, 70)
            lon = np.random.uniform(-180, 180)
            
            intensity = np.random.uniform(1.0, 1.5)
            probability = np.random.uniform(0.05, 0.25)
            sst = 28 - abs(lat) * 0.3 + np.random.normal(0, 3)
            sst = np.clip(sst, 16, 30)
            chlorophyll = np.random.lognormal(-0.5, 0.8)
            chlorophyll = np.clip(chlorophyll, 0.05, 2.0)
            
            points.append({
                "lat": round(lat, 4),
                "lon": round(lon, 4),
                "intensity": round(intensity, 4),
                "probability": round(probability, 4),
                "chlorophyll": round(chlorophyll, 4),
                "sst": round(sst, 2)
            })
        
        # Calculate statistics
        intensities = [p["intensity"] for p in points]
        probabilities = [p["probability"] for p in points]
        chlorophylls = [p["chlorophyll"] for p in points]
        ssts = [p["sst"] for p in points]
        
        data["depths"][str(depth)] = {
            "depth": depth,
            "data": points,
            "stats": {
                "mean_intensity": round(np.mean(intensities), 4),
                "mean_probability": round(np.mean(probabilities), 4),
                "mean_chlorophyll": round(np.mean(chlorophylls), 4),
                "mean_sst": round(np.mean(ssts), 2),
                "count": len(points)
            }
        }
        
        print(f"Generated {len(points)} points for depth {depth}m")
    
    return data

if __name__ == "__main__":
    print("Generating synthetic MODIS data...")
    data = generate_synthetic_modis_data()
    
    output_path = "../public/processed-data/modis-shark-model.json"
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"\n✅ Synthetic data saved to: {output_path}")
    print(f"Total depths: {len(data['depths'])}")
    print(f"Total points across all depths: {sum(len(d['data']) for d in data['depths'].values())}")
    print("\nSample statistics (50m depth):")
    stats = data['depths']['50']['stats']
    for key, value in stats.items():
        print(f"  {key}: {value}")
