import React, { useState } from "react";

type AccordianProps = {
  items: Array<{ title: string; content: string }>;
};
function Accordian({ items }: AccordianProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  function handleToggle(index: number) {
    setOpenIndex(index === openIndex ? null : index);
  }
  return (
    <div className=" accordian">
      {items.map((item, index) => {
        return (
          <div key={index} className="accordian-item">
            <button
              onClick={() => handleToggle(index)}
              className="accordian-title"
            >
              {item.title}
              <span>{openIndex === index ? "⬇️" : "⬆️"}</span>
            </button>
            {openIndex === index && (
              <div className="accordian-content"> {item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordian;
