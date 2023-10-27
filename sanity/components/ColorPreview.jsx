import React from "react";

const ColorPreview = ({ title, color }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color,
      }}
    />
  );
};

export default ColorPreview;
