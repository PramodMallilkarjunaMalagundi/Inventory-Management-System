const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

/* 🔐 MIDDLEWARE */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

/* 🔗 CONNECT MONGODB */
mongoose
  .connect("mongodb://127.0.0.1:27017/inventrack")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

/* ================= MODELS ================= */

const User = mongoose.model("User", new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
}));

const Item = mongoose.model("Item", new mongoose.Schema({
  name: String,
  brand: String,
  location: String,
  quantity: Number,
  price: Number,
  image: String,
  createdAt: { type: Date, default: Date.now }
}));

const ActivityLog = mongoose.model("ActivityLog", new mongoose.Schema({
  action: String,
  item: String,
  quantity: Number,
  user: String,
}, { timestamps: true }));

/* ================= AUTH ================= */

app.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || "user"
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

/* ================= SETTINGS ================= */

app.put("/user/update", async (req, res) => {
  try {
    const { email, name, newEmail } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.email = newEmail || email;

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Update error", error: err.message });
  }
});

app.post("/user/change-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Password error", error: err.message });
  }
});

app.delete("/user/delete/:email", async (req, res) => {
  await User.deleteOne({ email: req.params.email });
  res.json({ message: "Account deleted" });
});

/* ================= INVENTORY ================= */

app.post("/items", async (req, res) => {
  const item = await Item.create(req.body);

  await ActivityLog.create({
    action: "Added Item",
    item: item.name,
    quantity: item.quantity,
    user: "Admin",
  });

  res.json(item);
});

app.get("/items", async (req, res) => {
  res.json(await Item.find().sort({ createdAt: -1 }));
});

app.put("/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await ActivityLog.create({
    action: "Updated Item",
    item: item.name,
    quantity: item.quantity,
    user: "Admin",
  });

  res.json(item);
});

app.delete("/items/:id", async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  await ActivityLog.create({
    action: "Deleted Item",
    item: item.name,
    quantity: item.quantity,
    user: "Admin",
  });

  res.json({ message: "Deleted" });
});

/* ================= ACTIVITY ================= */

app.get("/activity", async (req, res) => {
  res.json(await ActivityLog.find().sort({ createdAt: -1 }));
});

/* ================= AI INSIGHTS (WORKING VERSION) ================= */

app.get("/ai-insights", async (req, res) => {
  try {
    const items = await Item.find();

    let totalValue = 0;
    let totalUnits = 0;

    const lowStock = [];
    const overStock = [];
    const highValue = [];

    items.forEach((item) => {
      const value = item.price * item.quantity;

      totalValue += value;
      totalUnits += item.quantity;

      if (item.quantity <= 10) {
        lowStock.push({ name: item.name, qty: item.quantity });
      }

      if (item.quantity >= 100) {
        overStock.push({ name: item.name, qty: item.quantity });
      }

      if (value >= 50000) {
        highValue.push({ name: item.name, value });
      }
    });

    const suggestions = [];

    if (lowStock.length > 0)
      suggestions.push("Some items are running low. Reorder soon.");

    if (overStock.length > 0)
      suggestions.push("You have overstock items. Reduce inventory.");

    if (highValue.length > 0)
      suggestions.push("High value items detected. Monitor closely.");

    if (suggestions.length === 0)
      suggestions.push("Inventory looks healthy and balanced.");

    res.json({
      totalValue,
      totalUnits,
      lowStock,
      overStock,
      highValue,
      suggestions
    });

  } catch (err) {
    res.status(500).json({ message: "Insights error" });
  }
});

/* 🚀 START SERVER */
app.listen(5000, () => {
  console.log("🔥 Server running on http://localhost:5000");
});