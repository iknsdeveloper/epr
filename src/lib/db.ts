// Import the required module
const mongoose = require('mongoose');

// Initialize the connection object with the isConnected property set to false
const connection = {
  isConnected: false
};

// Function to establish a connection to the MongoDB database
async function connect() {
  // If already connected, return
  if (connection.isConnected) {
    return;
  }

  // If there are existing connections, check the connection state
  if (mongoose.connections.length > 0) {
    // Update the isConnected property based on the first connection's readyState
    connection.isConnected = mongoose.connections[0].readyState === 1;

    // If already connected, return
    if (connection.isConnected) {
      return;
    }

    // Disconnect from the existing connections if not connected
    await mongoose.disconnect();
  }

  // Establish a new connection to the MongoDB database
  const db = await mongoose.connect(process.env.MONGO_URI);

  // Update the isConnected property based on the new connection's readyState
  connection.isConnected = db.connections[0].readyState === 1;
}

// Function to disconnect from the MongoDB database
async function disconnect() {
  // If connected
  if (connection.isConnected) {
    // Check if in production environment
    if (process.env.NODE_ENV === 'production') {
      // Disconnect from the database and set isConnected to false
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  }
}

// Export the connect and disconnect functions as part of the db object
const db = { connect, disconnect };
export default db;
