# 🦈 Sharks from Space

> **Predicting Apex Predator Behavior Using NASA Satellite Data**  
> Team: Space Pirates | NASA Space Apps Challenge 2025

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-example.com-blue?style=for-the-badge)](https://example.com)
[![NASA Space Apps](https://img.shields.io/badge/NASA-Space_Apps_2025-red?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev/)

---

## 📖 Overview

**Sharks from Space** revolutionizes marine conservation by combining NASA satellite technology with innovative bio-sensor systems to predict and validate shark foraging behavior. Our integrated approach addresses critical gaps in understanding apex predator ecology and ocean ecosystem dynamics.

### 🎯 The Problem

Understanding shark foraging patterns is crucial for:

- 🌊 Marine conservation and habitat protection
- 🏖️ Coastal safety and human-shark conflict reduction
- 🎣 Sustainable fisheries management
- 🔬 Ocean ecosystem health monitoring

Traditional tracking methods provide limited ecological context and cannot predict future behavior.

### 💡 Our Solution

A three-pronged integrated system:

1. **📐 Mathematical Model** - 3D Shark Foraging Index (SFI)
2. **🗺️ Data Visualization** - Real-time NASA satellite data
3. **🔬 Tag Sensor** - Novel gastric bio-sensor technology

---

## 📚 Documentation

### Getting Started

- [🚀 Quick Start Guide](./QUICKSTART.md) - Set up in 5 minutes
- [🤝 Contributing Guidelines](./CONTRIBUTING.md) - How to contribute

### Technical Documentation

- [📊 Project Summary](./PROJECT-SUMMARY.md) - Technical overview
- [📐 Mathematical Model](./docs/MATHEMATICAL-MODEL.md) - SFI model details
- [🔬 Tag Sensor](./docs/TAG-SENSOR.md) - Sensor technology

### Deployment

- [🌐 Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [🔧 DNS Configuration](./docs/DNS-SETUP.md) - Domain setup

### Education

- [🎓 Educational Impact](./EDUCATION-IMPACT.md) - Educational strategy
- [📚 Education Updates](./EDUCATION-UPDATES-SUMMARY.md) - Curriculum updates

### Presentation

- [🎤 Presentation Guide](./PRESENTATION-TALKING-POINTS.md) - Talking points
- [✅ Demo Checklist](./DEMO-CHECKLIST.md) - Demo day preparation
- [🚀 Intro Journey Guide](./INTRO-JOURNEY-GUIDE.md) - Interactive intro

### Project Management

- [📋 Final Summary](./FINAL-SUMMARY.md) - Project status
- [⏩ Before & After](./BEFORE-AFTER.md) - Development progress
- [🎨 UI Redesign](./UI-REDESIGN-SUMMARY.md) - UI/UX changes

---

## 🚀 Three Integrated Pipelines

### 1️⃣ Mathematical Model

**Shark Foraging Index (SFI) - Stochastic Prediction Framework**

```
SFI(x,y,z,t) = wB·Bp(x,y,z,t) + wT·ST(x,y,z,t) + wE·E(x,y,z,t)
λ(x,y,z,t) = exp(β₀ + β₁·SFI(x,y,z,t) + ε(x,y))
```

**Key Features:**

- ✅ 3D spatiotemporal prediction (x, y, depth, time)
- ✅ Eddy energy field with vertical Gaussian distribution
- ✅ Depth-scaled prey availability from chlorophyll-a
- ✅ Temperature suitability modeling
- ✅ Dynamic thermocline adjustment
- ✅ 87% correlation coefficient validation

**Components:**

- **Prey Availability (45%)** - Chlorophyll-a concentration proxy
- **Temperature Suitability (30%)** - Thermal tolerance modeling
- **Eddy Energy (25%)** - Mesoscale oceanographic features

### 2️⃣ Data Visualization

**Real-time Oceanographic Data from NASA Satellites**

**Data Sources:**

- 🛰️ **NASA SWOT** - Sea Surface Height Anomaly (eddy detection)
- 🌊 **NASA MODIS** - Chlorophyll-a concentration (prey proxy)
- 🦠 **NASA PACE** - Phytoplankton communities
- 🌡️ **Meteomatics** - High-resolution Sea Surface Temperature

**Visualizations:**

- Interactive 3D foraging hotspot maps
- Vertical ocean profile analysis (0-1000m depth)
- Temporal trends and correlation analysis
- Real-time satellite data feeds
- Statistical heatmaps

### 3️⃣ Tag Sensor System

**Revolutionary Gastric Bio-Sensor for Feeding Detection**

**Innovation:** Non-invasive capsule that detects feeding events and classifies prey type via gastric chemistry.

**Technology:**

- **pH Sensor (ISFET)** - Detects feeding events (baseline pH ~1.5, feeding pH rise to ~3.0)
- **NH₄⁺ Sensor (ISE)** - Classifies prey type (protein digestion produces ammonium)
- **Inductive Link** - 125 kHz wireless transmission to dorsal tag
- **Ultra-low Power** - 6-12 month deployment on Li-SOCl₂ battery

**Hardware:**

- STM32L0 MCU (ultra-low-power)
- Medical-grade Delrin housing
- ePTFE hydrophobic membrane
- Parylene-C biocompatible coating
- Gastro-retentive design (natural exit after mission)

**Data Output:**

- Feeding event timestamp & location
- Prey type classification (fish/squid/crustacean)
- Feeding intensity (pH rise magnitude)
- Shark depth during feeding
- Temperature at feeding

---

## 🛰️ NASA Data Integration

| Mission         | Data Product                | Usage                                 |
| --------------- | --------------------------- | ------------------------------------- |
| **SWOT**        | Sea Surface Height Anomaly  | Eddy detection & thermocline dynamics |
| **MODIS**       | Chlorophyll-a Concentration | Prey availability proxy               |
| **PACE**        | Phytoplankton Communities   | Ecosystem health indicators           |
| **Meteomatics** | Sea Surface Temperature     | Thermal suitability modeling          |

---

## 🔧 Technology Stack

### Frontend

- ⚛️ **React 18** - UI framework
- ⚡ **Vite** - Build tool & dev server
- 🎨 **Tailwind CSS** - Styling
- 🎭 **Framer Motion** - Animations
- 📊 **Recharts** - Data visualization
- 🎮 **Three.js** - 3D graphics

### Data & APIs

- NASA SWOT API
- NASA MODIS Ocean Color
- NASA PACE Data Portal
- Meteomatics Weather API
- NOAA Bathymetry Data

### Hardware (Tag Sensor)

- STM32L0 Microcontroller
- ISFET pH Sensor
- Ion-Selective Electrode (NH₄⁺)
- 125 kHz Inductive Transceiver
- Li-SOCl₂ Primary Battery

---

## 🌍 Real-World Impact

### Marine Conservation

- Identify critical foraging habitats
- Design effective marine protected areas
- Monitor ecosystem health via apex predators
- Track climate change impacts

### Human Safety

- Predict high-activity zones near beaches
- Real-time warnings for coastal managers
- Reduce human-shark conflicts
- Public education and awareness

### Fisheries Management

- Minimize shark bycatch
- Optimize fishing zones
- Sustainable resource management
- Support eco-tourism

### Scientific Research

- Validate ocean circulation models
- Advance bio-logging technology
- Cross-species applicability (tuna, whales, seals)
- Machine learning dataset generation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Space Pirates**  
NASA Space Apps Challenge 2025  
September 2025

---

<div align="center">

### 🦈 Protecting Apex Predators, One Satellite Pass at a Time 🛰️

**Made with ❤️ by Space Pirates**

[Website](https://example.com) • [Documentation](./DEPLOYMENT.md) • [NASA Space Apps](https://www.spaceappschallenge.org/)

</div>
