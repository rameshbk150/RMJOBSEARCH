import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

/* ================================= */
/* MIDDLEWARE */
/* ================================= */

app.use(
  cors({
    origin: ["https://jobsearchtect.onrender.com", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

/* ================================= */
/* ROUTES */
/* ================================= */

app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/profile", profileRoutes);

/* ================================= */
/* TEST ROUTE */
/* ================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Portal backend server is running",
  });
});

/* ================================= */
/* SERVER */
/* ================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Backend running on http://localhost:${PORT}`
  );
});