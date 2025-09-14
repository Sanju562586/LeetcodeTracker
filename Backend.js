// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(
  "mongodb+srv://sanjaykumardupati6_db_user:Sanju%40126%23@lt.vjjea71.mongodb.net/test?retryWrites=true&w=majority&appName=LT",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const problemSchema = new mongoose.Schema({
  name: String,
  link: String,
  date: Date,
  difficulty: Number,
});

const Problem = mongoose.model("Problem", problemSchema);

// Get all problems
app.get("/problems", async (req, res) => {
  const problems = await Problem.find().sort({ date: -1 });
  res.json(problems);
});

// Add a problem
app.post("/problems", async (req, res) => {
  const { name, link, date, difficulty } = req.body;
  try {
    const problem = new Problem({ name, link, date, difficulty });
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a problem (optional)
app.delete("/problems/:id", async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
