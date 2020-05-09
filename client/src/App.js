import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const App = () => {
  return (
    <div className="app">
      <h1>Blog</h1>
      <CreatePost />
      <Posts />
    </div>
  );
};

export default App;
