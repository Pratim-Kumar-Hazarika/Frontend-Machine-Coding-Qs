import React, { useEffect, useState } from "react";

function ProgressBar({
  value = 0,
  onComplete,
}: {
  value: number;
  onComplete: () => void;
}) {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)));
    if (value == 100) {
      onComplete();
    }
  }, [value]);
  return (
    <div className="progress">
      <span
        style={{
          color: percent > 49 ? "white" : "black",
        }}
      >
        {percent.toFixed()}%
      </span>
      <div
        role="progressbar"
        style={{
          //   width: `${percent}%`,
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
        aria-label="Progress"
      ></div>
    </div>
  );
}

export default ProgressBar;
