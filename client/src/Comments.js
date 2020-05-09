import React from "react";

const Comments = ({ comments }) => {
  const displayComments = comments.map((comment) => {
    let content;
    switch (comment.status) {
      case "rejected":
        content = "Comment is rejected";
        break;
      case "pending":
        content = "Comment is pending";
        break;
      default:
        content = comment.content;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
