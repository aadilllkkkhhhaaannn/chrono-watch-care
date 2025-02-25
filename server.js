const express = require("express");
const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 2000;

const cors = require("cors");
app.use(cors());
// connect DATABASE
connectDB();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "welcome to the ChronoWatchCare",
  });
});

// User route

app.use("/api/user", require("./routes/userRoute"));

// Service route

app.use("/api/service", require("./routes/watchServiceRoute"));

// Admin route

app.use("/api/admin", require("./routes/adminRoutes"));

// error Handler

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`I am Server at PORT  : ${PORT}`);
});
