import express from "express";
import pool from "../config/db.js";
import { protect } from "../middlewares/authmiddleware.js";
import { requireAdmin } from "../middlewares/rolemiddleware.js";

const router = express.Router();

router.get("/", protect, requireAdmin, async (req, res) => {
  const [users] = await pool.query(
    "SELECT id,name,email,role,created_at FROM users"
  );
  res.json(users);
});

router.get("/:id", protect, async (req, res) => {
  const [[user]] = await pool.query(
    "SELECT id,name,email,role,created_at FROM users WHERE id=?",
    [req.params.id]
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

export default router; 