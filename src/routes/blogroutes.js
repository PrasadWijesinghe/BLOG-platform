import express from "express";
import pool from "../config/db.js";
import { protect } from "../middlewares/authmiddleware.js";
import { requireAdmin } from "../middlewares/rolemiddleware.js";

const router = express.Router();

const summarize = (content) => {
  if (!content) return "";
  const s = content.trim().slice(0, 120);
  return s.length < 120 ? s : s + "...";
};


router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  const summary = summarize(content);

  await pool.query(
    "INSERT INTO blogs (title,content,summary,user_id) VALUES (?,?,?,?)",
    [title, content, summary, req.user.id]
  );

  res.json({ message: "Blog created" });
});


router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const [blogs] = await pool.query(
    "SELECT * FROM blogs ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );

  res.json({ page, limit, data: blogs });
});


router.get("/:id", async (req, res) => {
  const [[blog]] = await pool.query("SELECT * FROM blogs WHERE id=?", [req.params.id]);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});


router.put("/:id", protect, async (req, res) => {
  const { title, content } = req.body;

  const [[blog]] = await pool.query("SELECT * FROM blogs WHERE id=?", [req.params.id]);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  if (req.user.role !== "admin" && blog.user_id !== req.user.id)
    return res.status(403).json({ message: "Owner or Admin only" });

  const summary = content ? summarize(content) : blog.summary;

  await pool.query(
    "UPDATE blogs SET title=?, content=?, summary=? WHERE id=?",
    [title || blog.title, content || blog.content, summary, req.params.id]
  );

  res.json({ message: "Blog updated" });
});


router.delete("/:id", protect, requireAdmin, async (req, res) => {
  await pool.query("DELETE FROM blogs WHERE id=?", [req.params.id]);
  res.json({ message: "Blog deleted" });
});

export default router;