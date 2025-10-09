const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth"); // CommonJS style
const entryRoutes = require("./routes/entries")
const {verifyToken} = require("./middleware/auth")


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api",entryRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
