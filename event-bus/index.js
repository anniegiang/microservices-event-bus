const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const events = []; // cache events

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event); // sychronizes services when services are down or added later
  await axios.post("http://posts-clusterip-srv:4000/events", event); // posts
  await axios.post("http://comments-clusterip-srv:4001/events", event); // comments
  await axios.post("http://queries-clusterip-srv:4002/events", event); // queries
  await axios.post("http://moderation-clusterip-srv:4003/events", event); // moderation

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => res.send(events));

app.listen("4005", () => {
  console.log("Listening on 4005");
});
