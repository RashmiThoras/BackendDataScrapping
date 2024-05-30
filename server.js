const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

// Initialize Sequelize
const sequelize = new Sequelize('cext', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define a model
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  about: DataTypes.TEXT,
  bio: DataTypes.TEXT,
  location: DataTypes.STRING,
  followerCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  connectionCount: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {});

// Sync the models
sequelize.sync();

// Define routes
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));