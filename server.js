// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory user storage
let users = [];
let currentId = 1;

// Create - Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: currentId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read - Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Read - Get a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update - Update a user by ID
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((u) => u.id === parseInt(id));
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete - Remove a user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
