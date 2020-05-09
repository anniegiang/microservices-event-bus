const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/post/:postId/comments", (req, res) => {
  res.send(commentsByPostId[req.params.postId] || []);
});

app.post("/post/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, content, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }
  res.send(req.body.type);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
