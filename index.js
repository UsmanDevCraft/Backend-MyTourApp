const express = require("express");
require("dotenv").config();
const connectToDb = require("./db.js");
const router = require("./Api/Apis.js");
const router2 = require("./Api/BooktourApi.js");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());
connectToDb();

const port = process.env.PORT;

app.use("/api/auth", router);
app.use("/api/tour", router2);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is working on localhost:${port}`);
});
