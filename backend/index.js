const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./config/connectToDB");

const app = express();

// Load environment variables
dotenv.config();
connectToDB();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve React app for any other route not handled above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware (should be after all routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});