import express, { Request, Response } from "express";
const router = express.Router();
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



router.post("/entries", async (req, res) => {
  try {
    const { image, country, location, place, date, details } = req.body;

    const sql = `INSERT INTO entries (image_src,image_alt,country,location,place,date,details)VALUES(?,?,?,?,?,?,?)`;
    const [results] = await db.execute(sql, [
      image.src,
      image.alt,
      country,
      location,
      place,
      date,
      details,
    ]);
    const insertId = (results as any).insertId; 
    const newEntry = { id: insertId, image, country, location, place, date, details };
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error inserting:", err);
    res.status(500).json({ message: "Database error", error: err });
  }
});

router.get("/entries",async(req,res)=>{
    try{
        const sql = "SELECT * FROM entries"
        const[rows] = await db.execute(sql)as any[];
        res.json(rows);
    }
    catch(err)
    {
        console.error("Error fetching entries: ",err);
        res.status(500).json({message:"Database error",error:err});
    }
});

module.exports = router;
