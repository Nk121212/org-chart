import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // kalau mau konek MySQL

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi pool MySQL
const pool = mysql.createPool({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "root@123",          // sesuaikan
  database: "orgchart_demo" // sesuaikan
});

app.get("/", (req, res) => res.send("Backend running ✅"));

// API ambil data org chart
app.get("/api/org", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
