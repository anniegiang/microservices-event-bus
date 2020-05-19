import React, { useState } from "react";
import axios from "axios";

const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/post/${postId}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <div className="create-comment">
      <h4>Create a comment</h4>
      <form onSubmit={handleComment}>
        <label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
          />
        </label>
      </form>
    </div>
  );
};

export default CreateComment;
