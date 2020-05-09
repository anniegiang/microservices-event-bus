import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/post/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    getComments();
  }, [comments]);

  const displayComments = comments.map((comment) => (
    <div key={comment.id}>{comment.content}</div>
  ));

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
