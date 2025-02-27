# Drone Frontier: The Last Outpost

A React + Three.js drone simulation game with Logitech Extreme 3D Pro Joystick integration.

# Tron Drone Simulator

Welcome to the **Tron Drone Simulator**, an immersive game project designed to combine futuristic visuals, interactive gameplay, and advanced drone physics. This repository serves as a foundation for onboarding new developers and expanding the game logic for enriched and captivating player experiences.

---

## **Overview**

**Tron Drone Simulator** places players in a digital world inspired by the Tron aesthetic. Players control drones to complete objectives while navigating through grid-based environments, anomalies, and boundaries. This project emphasizes:

- 🚀 Dynamic drone control using keyboard, joystick, and mouse.
- ⚙️ Physics-based interactions (e.g., anomalies, repulsive boundaries).
- 🌟 Immersive visuals including glowing grids, orbiting mechanics, and particle effects.
- 🛠️ Modular design for future expansion.

---

## **Getting Started**

### **Prerequisites**

Ensure the following tools are installed:

- 🟢 **Node.js** (v16 or higher)
- 📦 **npm** or **yarn**
- 🔗 **Git**
- 🌐 **A WebGL-capable browser** (e.g., Chrome, Firefox)

### **Installation**

1. 🖥️ Clone the repository:

   ```bash
   git clone https://github.com/Aimcomlt/tron-drone-simulator.git
   cd tron-drone-simulator
   ```

2. 📂 Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. ▶️ Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

4. 🌐 Open the game in your browser:

   ```
   http://localhost:3000
   ```

5. 🖧 Start the backend server:
   ```bash
   node server.js
   ```

---

## **Project Structure**

```plaintext
src/
├── components/          # Core game components
│   ├── Drone.js         # 🚁 Drone control logic
│   ├── Anomaly.js       # 🌌 Anomaly interactions
│   ├── BoundaryCube.js  # 🔲 Grid boundaries with repulsion
│   ├── MapManager.js    # 🗺️ Map loading and rendering
│   ├── CameraManager.js # 🎥 Dynamic camera focus
│   └── UI/              # 🖼️ UI components
│       ├── MiniMap.js           # 🗺️ 2D mini-map
│       ├── CircularMiniMap.js   # 🎯 Drone orientation tracker
│       └── DroneTracker.js      # 📊 Drone metrics tracker
├── hooks/               # ⚓ Custom React hooks (e.g., joystick)
├── redux/               # 🟥 Redux state management
│   ├── store.js         # 🏗️ Redux store setup
│   └── slices/          # 🔄 State slices for modular management
│       ├── droneSlice.js # 🚁 Drone state
│       └── settingsSlice.js # ⚙️ Game settings
├── shaders/             # 💡 Custom GLSL shaders (e.g., grid effects)
├── App.js               # 🏠 Main application entry
├── index.js             # 🚦 Application bootstrap
└── server.js            # 🖧 Backend server for game logic
```

---

## **Game Logic Development**

### **1. Drone Controls**

- **Modes:**

  - 🕹️ **Manual Mode:** Real-time control using keyboard or joystick.
  - 🤖 **AutoPilot Mode:** Pre-defined waypoint navigation.
  - 🔄 **Orbit Mode:** Circular path around the anomaly.

- **Customization:**
  - 🔧 Adjust drone physics (e.g., speed, tilt sensitivity) in `Drone.js`.
  - ➕ Add additional control modes in `DroneAutoPilot.js` or `DroneOrbit.js`.

### **2. Interactive Features**

#### **A. Anomalies**

- **Logic:** 🌌 The anomaly repels objects that approach its core.
- **Visual Effects:**
  - ✨ Pulsating shaders.
  - 💨 Particle effects to enhance immersion.

#### **B. Boundary Cube**

- **Logic:** 🔲 Encloses the grid and repels objects inward to simulate confinement.
- **Visual Effects:**
  - 🔹 Glowing grid lines.
  - 🌟 Pulsating edges for Tron aesthetics.

### **3. UI Enhancements**

- **MiniMap:**

  - 🗺️ Tracks drone position and orientation.
  - 📍 Displays anomalies, boundaries, and waypoints.

- **Drone Tracker:**

  - 📊 Displays speed, tilt, and position in real time.

- **Game Controls:**
  - 🎛️ Add toggles for modes and visual effects.

---

## **Future Development**

### **1. Multiplayer Integration**

- 👫 Allow multiple players to control drones in a shared environment.
- 🔄 Implement real-time synchronization using WebSockets or WebRTC.

### **2. Dynamic Obstacles**

- 🚧 Introduce moving barriers or dynamic anomalies.
- 🧠 Add AI-driven entities for interaction.

### **3. Procedural Terrain**

- 🌄 Expand beyond grids to dynamically generated terrains with heightmaps.
- 🛬 Allow drones to interact with terrain physics.

### **4. Immersive Effects**

- 🎵 Add ambient audio and sound effects for anomalies, collisions, and boundaries.
- 💥 Introduce dynamic lighting effects (e.g., flashes, explosions).

### **5. Story-Driven Gameplay**

- 🕹️ Develop missions, objectives, and a scoring system.
- 📖 Create a narrative to engage players further.

---

## **Contributing**

We welcome contributions from the community! To get started:

1. 🍴 Fork the repository.
2. 🌱 Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. 💾 Commit your changes:
   ```bash
   git commit -m "Add your feature description here"
   ```
4. 📤 Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. 🔄 Create a pull request.

---

## **License**

This project is licensed under the **MIT License**.

---

## **Contact**

For questions or feedback, please reach out to the project maintainer:

- 📧 **Email:** aimcomlt@example.com
- 🌐 **GitHub:** [Aimcomlt](https://github.com/Aimcomlt)
#   d r o n e - s i m u l a t o r - g r i d 
 
 
