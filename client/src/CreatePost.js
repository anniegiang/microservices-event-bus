import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { title });
    setTitle("");
  };

  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:{" "}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </label>
      </form>
    </div>
  );
};

export default CreatePost;
