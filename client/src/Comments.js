import React from "react";

const Comments = ({ comments }) => {
  const displayComments = comments.map((comment) => (
    <div key={comment.id}>{comment.content}</div>
  ));

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
