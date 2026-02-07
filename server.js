import dotenv from "dotenv";
dotenv.config();

import express from "express";

import userRoutes from "./src/routes/userroutes.js";
import authRoutes from "./src/routes/authroutes.js";
import blogRoutes from "./src/routes/blogroutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("Backend is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));