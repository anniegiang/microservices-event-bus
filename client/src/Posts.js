import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, [posts]);

  const renderPosts = Object.values(posts).map((post) => (
    <div className="post" key={post.id}>
      {post.title}
    </div>
  ));

  return <div className="posts">{renderPosts}</div>;
};

export default Posts;
