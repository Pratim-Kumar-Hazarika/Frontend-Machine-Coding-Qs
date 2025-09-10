import React, { forwardRef } from "react";

const Note = forwardRef(({ content, initialPosition, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${initialPosition?.y}px`,
        left: `${initialPosition?.x}px`,
      }}
      {...props}
      className="note"
    >
      📌{content}
    </div>
  );
});

export default Note;
