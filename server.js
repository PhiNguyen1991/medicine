const express = require("express");
require("dotenv").config();
const cors = require("cors");
const {
  medicineCreate,
  medicineList,
  medicineUpdate,
  medicineGet,
} = require("./controllers/medicine");
const mongoose = require("mongoose");

/**
 * CONSTANTS
 */
const app = express();
const port = process.env.PORT || 1122;
const account = process.env.ACCOUNT;
const password = process.env.PASSWORD;
const connectionUrl = `mongodb+srv://${account}:${password}@cluster0.femyi.mongodb.net/database?retryWrites=true&w=majority`;

// DB Config
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

/**
 * MIDDLEWARE FOR BODY PARSER
 */
app.use(cors({ origin: true }));
app.use(express.json());

/**
 * MIDDLEWARE TO LOG
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {function} next callback
 */

const requestTime = function(req, res, next) {
  req.requestTime = Date.now();
  console.log("method " + req.method + " and url " + req.url);
  console.log("request came across at " + req.requestTime);
  next();
};
app.use(requestTime);

/**
 * API FOR GET LIST OF MEDICINE
 */
app.get("/medicines", async (req, res) => {
  try {
    const medicines = await medicineList();
    res.status(200).send(medicines);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

/**
 * API FOR GET LIST OF MEDICINE
 */
app.get("/medicine", async (req, res) => {
  try {
    const medicine = await medicineGet();
    res.status(200).send(medicine);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

/**
 * API FOR CREATE A SPECIFY MEDICINE
 */
app.post("/medicine", async (req, res) => {
  try {
    const data = req.body;
    const medicine = await medicineCreate(data);
    res.status(200).send(medicine);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

/**
 * API FOR UPDATE SPECIFY MEDICINE
 */
app.put("/medicine", async (req, res) => {
  try {
    const data = req.body;
    const medicine = await medicineUpdate(data);
    res.status(200).send(medicine);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

module.exports = app;
