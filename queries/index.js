const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated" || type === "CommentModerated") {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  console.log(posts);
  res.send({});
});

app.listen("4002", () => {
  console.log("Listening on 4002");
});
