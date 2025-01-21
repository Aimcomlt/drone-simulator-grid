const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { LogitechExtreme3DPro } = require('logitech-extreme-node');

const app = express();
const server = http.createServer(app);

// Enable CORS for React frontend
app.use(cors({ origin: 'http://localhost:3000' }));

// Initialize Socket.io server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Initialize Joystick
const joystick = new LogitechExtreme3DPro();

(async () => {
  try {
    await joystick.initialize();
    console.log('✅ Joystick initialized and ready!');

    // Emit joystick data every 100ms
    setInterval(() => {
      const controls = joystick.getAllControls();
      io.emit('joystick-data', controls);
      // Optional: Log data to debug
      // console.log('🎮 Joystick Data:', controls);
    }, 100);
  } catch (error) {
    console.error('❌ Failed to initialize joystick:', error.message);
  }
})();

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Graceful shutdown on Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  //joystick.close();  // Gracefully close joystick connection
  server.close(() => {
    console.log('🔒 Server closed');
    process.exit(0);
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
