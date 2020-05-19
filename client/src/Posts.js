import React, { useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import Comments from "./Comments";
import axios from "axios";

const postStyle = {
  width: "60%",
  border: "1px solid black",
  paddingBottom: "50px",
  marginBottom: "50px",
};

const Posts = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("http://posts.com/posts");
      setPosts(res.data);
    };
    getPosts();
  }, []);

  const renderPosts = Object.values(posts).map((post) => (
    <div className="post" key={post.id} style={postStyle}>
      <h3>{post.title}</h3>
      <CreateComment postId={post.id} />
      <Comments comments={post.comments} />
    </div>
  ));

  return <div className="posts">{renderPosts}</div>;
};

export default Posts;
