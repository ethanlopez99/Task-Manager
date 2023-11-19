import React from "react";
import "./tag.css";

const tag = ({ tag }) => {
  return (
    <p className="tag_container" style={{ background: tag.color }}>
      {tag.text}
    </p>
  );
};

export default tag;
