# 🎓 Educational Lesson Plans - Sharks from Space

> **Complete NGSS-Aligned Curriculum for High School Students**  
> Free, Open-Source, Accessible Worldwide

---

## 📚 Curriculum Overview

**Target Audience:** High School Students (Ages 14-18, Grades 9-12)  
**Duration:** 4 Lessons × 45-60 minutes each  
**Prerequisites:** Basic algebra, scientific method understanding  
**Cost:** 100% Free  
**Format:** Digital + Printable worksheets

### Learning Objectives

By completing this curriculum, students will:
- ✅ Understand how NASA satellites monitor ocean ecosystems
- ✅ Build a mathematical model for predicting shark behavior
- ✅ Analyze real satellite data using spreadsheets
- ✅ Design and prototype bio-sensor technology
- ✅ Apply conservation principles to real-world scenarios
- ✅ Develop data literacy and scientific reasoning skills

### Standards Alignment (NGSS)

| Standard | Description | Covered In |
|----------|-------------|------------|
| **HS-LS2-6** | Ecosystems: Interactions, Energy, Dynamics | Lesson 1, 3 |
| **HS-LS2-7** | Design, evaluate solutions for biodiversity loss | Lesson 4 |
| **HS-ESS2-5** | Plan solutions to reduce human impacts on Earth | Lesson 1, 4 |
| **HS-ESS3-1** | Evidence of Earth system interactions | Lesson 1, 2 |
| **HS-ETS1-2** | Design solutions to complex problems | Lesson 4 |
| **HS-ETS1-3** | Evaluate competing design solutions | Lesson 4 |

### Interdisciplinary Connections

- 🔬 **Science:** Marine biology, ecology, remote sensing
- 📐 **Mathematics:** Algebra, statistics, exponential functions
- 💻 **Technology:** Data analysis, spreadsheets, coding (optional)
- 🔧 **Engineering:** Sensor design, systems thinking
- 🌍 **Social Studies:** Conservation policy, human-wildlife coexistence
- 📝 **Language Arts:** Scientific writing, data communication
- 🎨 **Art:** Data visualization, infographic design

---

## 📖 Lesson 1: Satellites & Ocean Science

### Duration: 45-60 minutes

### Learning Objectives
- Explain how satellites observe ocean ecosystems from space
- Identify key NASA missions (SWOT, MODIS, PACE)
- Interpret satellite data products (SSHA, chlorophyll-a, SST)
- Connect ocean productivity to shark behavior

### Materials Needed
- Computer/tablet with internet (or printed materials)
- Access to Sharks from Space website
- Worksheet 1 (provided)
- Optional: Color printer for satellite images

### Lesson Outline

#### Part 1: Hook (5 min)
**Question:** "How can we study sharks without being in the water?"

**Activity:** Show NASA satellite image of ocean color (MODIS). Ask:
- What do the colors represent?
- How can this help us understand where sharks might be?

#### Part 2: Introduction to NASA Missions (15 min)

**NASA SWOT (Surface Water and Ocean Topography):**
- Launched: 2022
- Measures: Sea surface height (accuracy ±2 cm)
- Why it matters: Detects eddies that concentrate prey
- Show: Animation of eddy formation

**NASA MODIS (Moderate Resolution Imaging Spectroradiometer):**
- Launched: 2000 (20+ years of data!)
- Measures: Chlorophyll-a concentration (ocean color)
- Why it matters: Maps where phytoplankton (shark food's food) lives
- Show: Time-lapse of phytoplankton bloom

**NASA PACE (Plankton, Aerosol, Cloud, ocean Ecosystem):**
- Launched: January 2024 (newest!)
- Measures: Phytoplankton species identification
- Why it matters: Validates ecosystem health
- Show: Comparison of MODIS vs. PACE resolution

#### Part 3: Hands-On Activity (20 min)

**Activity: Analyze Real Satellite Data**

Using Sharks from Space platform:
1. Navigate to Data Visualization page
2. Select SWOT dataset
3. Identify areas of high sea surface height anomaly (eddies)
4. Switch to MODIS dataset
5. Identify areas of high chlorophyll-a (productive zones)
6. Compare: Do eddies coincide with high productivity?

**Worksheet Questions:**
1. Where are the strongest eddies located? (Latitude/longitude)
2. What is the chlorophyll-a concentration in those areas?
3. Predict: Would sharks be more likely here or in low-productivity zones?
4. Explain your reasoning using the food chain concept.

#### Part 4: Wrap-Up & Assessment (5 min)

**Exit Ticket:** "In 3 sentences, explain how NASA satellites help us understand shark behavior."

**Homework:** Research one additional NASA Earth observation mission and write one paragraph about how it could be used for marine conservation.

---

## 📖 Lesson 2: Building the Shark Foraging Index

### Duration: 60 minutes

### Learning Objectives
- Understand mathematical modeling in ecology
- Calculate the Shark Foraging Index (SFI) using real data
- Interpret weighted components (prey, temperature, eddies)
- Validate model predictions with real shark tracking data

### Materials Needed
- Spreadsheet software (Excel, Google Sheets) or calculator
- Real satellite data (provided in CSV format)
- Worksheet 2 with SFI formula
- Optional: Python/JavaScript coding environment

### Lesson Outline

#### Part 1: Introduction to Mathematical Modeling (10 min)

**Question:** "How can we predict where a shark will hunt tomorrow?"

**Concept:** Mathematical models simplify complex reality into equations

**The SFI Formula:**
```
SFI(x,y,z,t) = 0.45 × Prey + 0.30 × Temperature + 0.25 × Eddies
```

**Why these weights?**
- Prey (45%): Most important - sharks hunt where food is
- Temperature (30%): Sharks prefer certain temperatures (22-24°C)
- Eddies (25%): Eddies concentrate prey, creating hotspots

#### Part 2: Component Deep Dive (15 min)

**Component 1: Prey Availability**
- Formula: `Prey = Chlorophyll × exp(-depth/100) × TrophicLevel`
- Explanation: Phytoplankton → zooplankton → small fish → sharks
- Data source: NASA MODIS chlorophyll-a

**Component 2: Temperature Suitability**
- Formula: `Temp = exp(-(T - 23)² / (2 × 5²))`
- Explanation: Gaussian curve peaks at optimal temperature (23°C)
- Data source: Meteomatics SST

**Component 3: Eddy Energy**
- Formula: `Eddy = |SSHA| × exp(-depth²/1000)`
- Explanation: Higher SSHA = stronger eddy = more prey concentration
- Data source: NASA SWOT SSHA

#### Part 3: Hands-On Calculation (25 min)

**Activity: Calculate SFI Step-by-Step**

**Scenario:** Great White Shark off coast of California

**Given Data:**
- Chlorophyll-a: 2.5 mg/m³
- Sea Surface Temperature: 18°C
- SSHA: +0.15 m
- Depth: 50 m

**Step 1: Calculate Prey Component**
```
Prey = 2.5 × exp(-50/100) × 0.8
Prey = 2.5 × 0.606 × 0.8 = 1.212
```

**Step 2: Calculate Temperature Component**
```
Temp = exp(-(18-23)² / (2×5²))
Temp = exp(-25/50) = exp(-0.5) = 0.606
```

**Step 3: Calculate Eddy Component**
```
Eddy = 0.15 × exp(-50²/1000)
Eddy = 0.15 × exp(-2.5) = 0.15 × 0.082 = 0.012
```

**Step 4: Calculate Final SFI**
```
SFI = 0.45×1.212 + 0.30×0.606 + 0.25×0.012
SFI = 0.545 + 0.182 + 0.003 = 0.730
```

**Interpretation:** SFI = 0.73 (High foraging probability!)

#### Part 4: Validation Activity (10 min)

**Activity: Compare Predictions to Reality**

Show map with:
- SFI predictions (colored heat map)
- Real shark GPS locations (dots)

**Questions:**
1. Do shark locations match high SFI zones?
2. Calculate accuracy: % of sharks in SFI > 0.6 zones
3. Why aren't all sharks in predicted zones? (Discuss model limitations)

**Assessment:** Students calculate SFI for 5 different locations and rank them by foraging probability.

---

## 📖 Lesson 3: Ocean Food Webs & Ecosystem Dynamics

### Duration: 45-60 minutes

### Learning Objectives
- Diagram marine food web from phytoplankton to apex predators
- Explain trophic transfer efficiency (~10% rule)
- Analyze impact of removing sharks from ecosystems
- Apply conservation principles to real scenarios

### Materials Needed
- Whiteboard or poster paper
- Markers/colored pencils
- Food web diagram handout
- Case study videos (Yellowstone wolves, sharks in Bahamas)

### Lesson Outline

#### Part 1: Building a Food Web (15 min)

**Activity: Collaborative Food Web Diagram**

Start with sun, build up:
1. **Producers:** Phytoplankton (use NASA satellite data!)
2. **Primary Consumers:** Zooplankton
3. **Secondary Consumers:** Small fish (sardines, anchovies)
4. **Tertiary Consumers:** Medium fish (tuna, grouper)
5. **Apex Predators:** Sharks

Add connections showing energy flow.

**Key Concept:** Trophic transfer
- Only ~10% of energy transfers up each level
- Need 1000 kg phytoplankton → 100 kg zooplankton → 10 kg fish → 1 kg shark
- This is why we model chlorophyll in SFI!

#### Part 2: The Importance of Apex Predators (15 min)

**Video:** Yellowstone wolves case study (5 min)
- Wolves removed → elk overpopulation → vegetation destroyed → rivers changed
- Wolves reintroduced → ecosystem recovery

**Discussion:** How do sharks play the same role in oceans?

**Trophic Cascade Example:**
```
Sharks removed → 
  Medium predators increase (grouper) → 
    Small fish decrease (sardines) → 
      Zooplankton increase → 
        Phytoplankton decrease → 
          Ocean productivity drops → 
            CORAL REEFS DIE
```

**Real Data:** Show graphs of coral health vs. shark populations

#### Part 3: Case Study Analysis (15 min)

**Scenario:** Bahamas shark sanctuary (2011)

**Before sharks protected:**
- Shark populations declining 90%
- Reef fish declining 50%
- Tourism declining
- Local fishing declining (fewer fish)

**After sharks protected:**
- Shark populations recovering (+30% in 5 years)
- Reef fish recovering
- Shark diving tourism: +$800M annually
- Fishing improves (healthier ecosystem)

**Activity:** Students analyze data tables and graphs to quantify impact.

#### Part 4: Apply to Conservation (15 min)

**Scenario:** You're a marine conservation manager in Australia. Shark-human conflicts increasing. Beach closures hurting tourism. Some politicians calling for shark culls.

**Question:** What do you do?

**Options:**
A) Cull sharks (remove 100 sharks)
B) Close beaches permanently
C) Use SFI to predict high-activity periods, smart closures
D) Do nothing

**Activity:** Groups debate pros/cons of each option. Present solutions.

**Correct Answer Discussion:** Option C
- Evidence-based decision making
- Protects humans AND sharks
- Uses NASA data to save lives
- Win-win solution

**Assessment:** Write persuasive letter to politician explaining why Option C is best, using data and food web concepts.

---

## 📖 Lesson 4: Bio-Sensor Design Challenge

### Duration: 60 minutes

### Learning Objectives
- Apply engineering design process to solve real problem
- Understand sensor technology (pH, chemical sensors)
- Prototype a bio-sensor design (sketch or build)
- Evaluate trade-offs in design decisions

### Materials Needed
- Engineering design handout
- Sketch paper and pencils
- Optional: Arduino kit, pH sensors (for advanced building)
- Bio-sensor specification sheet
- Rubric for design evaluation

### Lesson Outline

#### Part 1: The Problem (10 min)

**Challenge:** Design a sensor that can detect when a shark is feeding, WITHOUT harming the shark.

**Constraints:**
- Must fit inside shark stomach (no surgery!)
- Must last 6-12 months
- Must detect feeding events
- Must classify prey type (fish vs. squid vs. crustacean)
- Must transmit data wirelessly

**Why this matters:** Validates our SFI predictions. If sensor says shark ate at location X, and SFI predicted high foraging at X, our model works!

#### Part 2: Sensing Principles (15 min)

**Option 1: pH Sensor**
- Normal shark stomach pH: ~1.5 (very acidic!)
- During feeding: pH rises to ~3.0 (still acidic but less)
- Technology: ISFET (Ion-Sensitive Field-Effect Transistor)
- Advantage: Fast response, low power
- Challenge: Harsh environment (acidic!)

**Option 2: NH₄⁺ (Ammonium) Sensor**
- Protein digestion releases NH₄⁺
- Different prey = different NH₄⁺ levels
  - Fish: High NH₄⁺ (lots of protein)
  - Squid: Medium NH₄⁺
  - Crustaceans: Lower NH₄⁺ (hard shells)
- Technology: Ion-Selective Electrode (ISE)
- Advantage: Classifies prey type
- Challenge: Slower response than pH

**Our Solution:** Use BOTH sensors!
- pH detects WHEN shark eats
- NH₄⁺ detects WHAT shark ate

**Show diagram:** Capsule design with both sensors

#### Part 3: Engineering Design Process (25 min)

**Step 1: Research (5 min)**
- Review existing shark tags (external, fin-mounted)
- Why those don't work: Can fall off, limit swimming, surgery required
- Gastric approach: Swallowed like pill, stays in stomach, exits naturally

**Step 2: Brainstorm (10 min)**

**Guiding Questions:**
- How big should capsule be? (Too big = won't swallow, too small = won't fit sensors)
- What shape? (Round = rolls around, oblong = gastro-retentive)
- What material? (Must be biocompatible, survive stomach acid)
- How to transmit data? (Radio through water doesn't work! Inductive through body does)
- How to power it? (Battery must last months)

**Activity:** Sketch 3 different designs. Label components.

**Step 3: Select Best Design (5 min)**

**Evaluation Criteria:**
- Feasibility (can we actually build it?)
- Cost (marine research budgets are tight)
- Effectiveness (will it work reliably?)
- Safety (won't harm shark)

**Activity:** Students present designs, class votes on best.

**Step 4: Prototype (5 min)**

**For classes with materials:** Build simple prototype with Arduino + pH sensor + LED (LED lights when "feeding" detected)

**For classes without materials:** Create detailed blueprint with dimensions, materials, circuit diagram

#### Part 4: Real-World Application (10 min)

**Show:** Our actual bio-sensor design from Sharks from Space

**Specifications:**
- Size: 35mm × 15mm (large pill size)
- Weight: 12 grams
- Battery: Li-SOCl₂ (6-12 month life)
- Sensors: ISFET pH + ISE NH₄⁺
- Transmission: 125 kHz inductive (to dorsal fin tag)
- Material: Medical-grade epoxy (same as surgical implants)

**Discussion:** How does our design compare to student designs?

**Assessment:** Students write 1-page design report:
1. Problem statement
2. Design solution (sketch + description)
3. Trade-offs explained
4. Predicted effectiveness
5. Future improvements

---

## 📊 Assessment & Grading

### Formative Assessment (During Lessons)
- Exit tickets (quick checks for understanding)
- Worksheet completion
- Class participation in discussions
- Hands-on activity engagement

### Summative Assessment (End of Unit)

**Option 1: SFI Prediction Project**
- Students download real NASA data for a region
- Calculate SFI for 10 locations
- Create map showing predictions
- Write report comparing predictions to actual shark sightings

**Option 2: Conservation Policy Proposal**
- Students choose a real location with shark-human conflicts
- Propose evidence-based solution using SFI
- Include budget, timeline, expected outcomes
- Present to "city council" (class)

**Option 3: Bio-Sensor Prototype & Pitch**
- Build/design improved bio-sensor
- Create pitch presentation (like Shark Tank)
- Explain science, engineering, impact
- Defend design choices in Q&A

### Rubric (100 points)

| Criteria | Excellent (90-100) | Good (80-89) | Needs Work (<80) |
|----------|-------------------|--------------|------------------|
| **Scientific Accuracy** | All concepts correct, uses proper terminology | Minor errors, mostly correct | Major misunderstandings |
| **Data Analysis** | Correctly interprets NASA data, accurate calculations | Minor calculation errors | Significant errors |
| **Critical Thinking** | Insightful connections, evaluates trade-offs | Some analysis present | Surface-level thinking |
| **Communication** | Clear, organized, visually effective | Mostly clear, some confusion | Disorganized, unclear |
| **Creativity** | Original ideas, innovative solutions | Standard approach, competent | Minimal effort, copied |

---

## 🎨 Extension Activities

### For Advanced Students

**Coding Challenge:** Implement SFI algorithm in Python
```python
def calculate_sfi(chlorophyll, temperature, ssha, depth):
    prey = chlorophyll * np.exp(-depth/100) * 0.8
    temp = np.exp(-(temperature - 23)**2 / (2 * 5**2))
    eddy = abs(ssha) * np.exp(-depth**2 / 1000)
    sfi = 0.45*prey + 0.30*temp + 0.25*eddy
    return sfi
```

**Machine Learning:** Train classifier to predict shark presence
- Features: SFI, bathymetry, time of day, season
- Labels: Shark present (1) or absent (0)
- Model: Logistic regression or random forest

**Research Paper:** Write peer-review style paper
- Abstract, Introduction, Methods, Results, Discussion
- Include real data analysis
- Submit to student science journals

### For Struggling Students

**Simplified Version:**
- Pre-calculated SFI values provided
- Focus on interpretation over calculation
- Visual/hands-on emphasis over math

**Scaffolded Worksheets:**
- Fill-in-the-blank equations
- Multiple choice for concept checks
- Word banks for terminology

**Partner Work:**
- Pair with advanced student
- Divide tasks by strength (one calculates, one interprets)

---

## 🌍 Teacher Resources

### Available Free:
- ✅ Lesson plan PDFs (this document)
- ✅ Student worksheets (printable)
- ✅ Answer keys
- ✅ Presentation slides (PowerPoint/Google Slides)
- ✅ Assessment rubrics
- ✅ Real NASA data (CSV files)
- ✅ Video links (curated YouTube playlists)

### Professional Development:
- Webinar recordings (45 min each lesson)
- Teacher discussion forum
- Office hours (monthly Q&A sessions)
- Curriculum implementation guide

### Download All Materials:
Visit [sharks-from-space.netlify.app/education](https://sharks-from-space.netlify.app/education)

---

## 📞 Support & Community

### Questions?
- Email: education@sharksfromspace.org (coming soon)
- Forum: GitHub Discussions
- Twitter: @SharksFromSpace

### Share Your Success!
- Student projects → tag #SharksFromSpace
- Classroom photos → tag #TeachWithNASA
- Featured on our website!

---

<div align="center">

## 🎓 Empowering 10,000 Students to Become Ocean Scientists 🛰️

**Made with ❤️ by Team Space Pirates**  
NASA Space Apps Challenge 2025

[🌐 Try Curriculum](https://sharks-from-space.netlify.app/education) • [📋 Documentation](./DOCUMENTATION.md) • [🎓 Education Impact](../EDUCATION-IMPACT.md)

</div>
