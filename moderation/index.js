const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { content, status } = req.body.data;
  let newStatus;
  if (content.includes("orange")) {
    newStatus = "rejected";
  } else {
    newStatus = "approved";
  }
  req.body.data.status = newStatus;
  await axios.post("http://localhost:4002/events", req.body);
  console.log(req.body);
  res.send(req.body);
});

app.listen("4003", () => {
  console.log("Listening on 4003");
});
