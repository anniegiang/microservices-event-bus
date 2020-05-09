const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event: ", req.body.type);
  res.send(req.body.type);
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
