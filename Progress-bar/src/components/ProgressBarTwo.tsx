import React, { useEffect, useState } from "react";

function ProgressBarTwo({ value }: { value: number }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(value);
    }, 100);
  }, [value]);
  return (
    <div className="progress-bar-2">
      <div
        style={{
          //   width: `${value}%`,
          transform: `translateX(${animatedProgress - 100}%)`,
          backgroundColor: "#00c251",
          color: animatedProgress < 5 ? "black" : "white",
        }}
        aria-valuenow={animatedProgress}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        {animatedProgress}%
      </div>
    </div>
  );
}

export default ProgressBarTwo;
