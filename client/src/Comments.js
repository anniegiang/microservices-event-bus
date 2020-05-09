import React from "react";

const Comments = ({ comments }) => {
  const moderateContent = (comment) => {
    const { id, content, status } = comment;
    let text;
    switch (status) {
      case "pending":
        text = "This comment is awaiting moderation";
        break;
      case "rejected":
        text = "This comment was rejected";
        break;
      default:
        text = content;
        break;
    }
    return <div key={id}>{text}</div>;
  };
  const displayComments = comments.map((comment) => moderateContent(comment));

  return <div className="comments">{displayComments}</div>;
};

export default Comments;
