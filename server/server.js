const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// create Connection
const pool = mysql.createPool({
  host: "localhost",
  user: "", //MySQL username
  password: "12345678", // MySQL password
  database: "employee_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Database initialization
const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        position VARCHAR(100),
        salary DECIMAL(10,2),
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log("Database table ensured");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
};

initializeDatabase();

// Create employee route
app.post("/employees", async (req, res) => {
  try {
    const { name, email, position, salary } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)",
      [name, email, position, salary]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create employee",
      details: error.message,
    });
  }
});

// Get employees route
app.get("/employees", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM employees ORDER BY date_created DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve employees",
      details: error.message,
    });
  }
});

// Update employee route
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position, salary } = req.body;
    await pool.execute(
      "UPDATE employees SET name = ?, email = ?, position = ?, salary = ? WHERE id = ?",
      [name, email, position, salary, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update employee",
      details: error.message,
    });
  }
});

// Delete employee route
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute("DELETE FROM employees WHERE id = ?", [id]);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete employee",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
