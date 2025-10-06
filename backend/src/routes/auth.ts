import express, { Request, Response } from "express"; // use import syntax
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// TypeScript interfaces for request bodies
interface LoginBody {
  username: string;
  password: string;
}

interface RegisterBody  {
  username: string;
  password: string;
  role?: string; // optional on registration
}

interface UserRow {
  id: number;
  username: string;
  password: string;
  role: string; // required because DB always has a role
}



// REGISTER
router.post("/register", async (req: express.Request<{}, {}, RegisterBody>, res: express.Response) => {
  const { username, password, role = "user" } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existingUsers]:[UserRow[],any] = await db.execute(
      "SELECT username FROM user WHERE username = ?",
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user (username, password, role) VALUES (?, ?, ?)";

    await db.execute(sql, [username, hashedPassword, role]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req: express.Request<{}, {}, LoginBody>, res: express.Response) => {
  const { username, password } = req.body;

  try {
    const [results]:[UserRow[],any] = await db.execute(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0]!;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "5m" }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
