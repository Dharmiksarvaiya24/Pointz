const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User, NewUser } = require("./user.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({ email, password, username });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error signing up", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.findOne({ email, username });
    if (!user) return res.status(400).json({ message: "User not found or incorrect username" });
    if (user.password !== password) return res.status(400).json({ message: "Incorrect password" });

    res.status(200).json({ message: "Login successful", username: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await NewUser.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/newuser", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username is required" });

  
    const count = await NewUser.countDocuments();
    if (count >= 2) {
      return res.status(400).json({ error: "User limit reached. Only 2 users" });
    }
    const userEntry = new NewUser({ username });
    await userEntry.save();

    res.json({ message: "User added successfully!", user: userEntry });

  } catch (error) {
    console.error("Error in /newuser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/deleteuser", async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    const deletedUser = await NewUser.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/updatepoint", async (req, res) => {
  try {
    const { id, points, description } = req.body;
    const user = await NewUser.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.points = points;
    user.description = description;
    await user.save();

    res.json({ message: "Points updated successfully", user });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a user by ID
app.get("/getuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await NewUser.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
