import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// Pool MySQL
const pool = mysql.createPool({
  host: "localhost",
  port: "3307", // sesuaikan
  user: "root",
  password: "root@123", // sesuaikan
  database: "orgchart_demo"
});

app.get("/", (req, res) => res.send("Backend running ✅"));

// ========== ORG CHART ==========
app.get("/api/employees", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ========== EMPLOYEES ==========
app.post("/api/employees", async (req, res) => {
  try {
    const { parentId, name, position, department, email, phone } = req.body;

    const [result] = await pool.query(
      "INSERT INTO employees (parentId, name, position, department, email, phone) VALUES (?, ?, ?, ?, ?, ?)",
      [parentId || null, name, position, department, email, phone]
    );

    console.log("Insert result:", result);

    res.json({ message: "Employee saved", id: result.insertId });
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).json({ error: "Failed to save employee" });
  }
});

// ========== EVALUATIONS ==========
app.post("/api/evaluations", async (req, res) => {
  try {
    const { employeeId, evaluator, score, comments } = req.body;

    const [result] = await pool.query(
      "INSERT INTO evaluations (employeeId, evaluator, score, comments) VALUES (?, ?, ?, ?)",
      [employeeId, evaluator, score, comments]
    );

    res.json({ message: "Evaluation saved", id: result.insertId });
  } catch (err) {
    console.error("Error saving evaluation:", err);
    res.status(500).json({ error: "Failed to save evaluation" });
  }
});

// ========== LEAVES ==========
app.post("/api/leaves", async (req, res) => {
  try {
    const { employeeId, start_date, end_date, reason } = req.body;

    const [result] = await pool.query(
      "INSERT INTO leaves (employeeId, start_date, end_date, reason) VALUES (?, ?, ?, ?)",
      [employeeId, start_date, end_date, reason]
    );

    res.json({ message: "Leave request submitted", id: result.insertId });
  } catch (err) {
    console.error("Error saving leave:", err);
    res.status(500).json({ error: "Failed to submit leave request" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
