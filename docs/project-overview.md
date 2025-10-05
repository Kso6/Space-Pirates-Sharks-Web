# Space Pirates - Sharks from Space

## NASA Space Apps Challenge 2025

### Project Overview

A comprehensive system for predicting shark foraging behavior using NASA satellite data (SWOT, MODIS, PACE) combined with innovative bio-sensor technology.

---

## Pipeline Architecture

### 1. Mathematical Model ✅ COMPLETE

**Shark Foraging Index (SFI)**

```
SFI(x,y,z,t) = wB·Bp(x,y,z,t) + wT·ST(x,y,z,t) + wE·E(x,y,z,t)
```

**Components:**

- **Eddy Current Indicator**: 3D mesoscale eddy field from SSHA data
- **Prey Availability**: Depth-scaled chlorophyll-based proxy
- **Temperature Suitability**: Gaussian thermal preference model

**Stochastic Model:**

```
λ(x,y,z,t) = exp(β₀ + β₁·SFI(x,y,z,t) + ε(x,y))
```

---

### 2. Tag Sensor Technology ✅ COMPLETE

**Internal Gastric Capsule Tag**

**Key Features:**

- pH sensing for feeding event detection
- NH₄⁺/NH₃ sensing for prey type classification
- Ultra-low power design (6-12 months battery life)
- Inductive near-field communication to dorsal tag
- Biosafe, gastro-retentive design

**Architecture:**

- Housing: Delrin/Parylene-C coated capsule
- Sensors: ISFET pH + NH₄⁺ ISE micro-electrode
- Power: Li-SOCl₂ bobbin cell (1200 mAh)
- Comms: 125 kHz inductive link

---

### 3. Data Visualization Pipeline 🔄 IN PROGRESS

**Data Sources:**

- NASA SWOT: Sea Surface Height Anomaly (SSHA)
- NASA MODIS: Chlorophyll-a concentration, SST
- NASA PACE: Phytoplankton communities
- Meteomatics: Supplementary oceanographic data
- Tag Network: Real-time feeding events

**Visualization Goals:**

- Interactive 3D ocean visualization
- Real-time foraging prediction maps
- Historical trend analysis
- Tag sensor data integration
- Educational dashboard

---

## Website: example.com

**Status:** Domain registered, ready for deployment
**Tech Stack:** React + Three.js + D3.js + Mapbox GL
**Hosting:** Static site deployment
