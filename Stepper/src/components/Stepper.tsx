import React, { useEffect, useRef, useState } from "react";

type StepperProps = {
  stepsConfig: {
    name: string;
    Component: () => React.ReactNode;
  }[];
};

function Stepper({ stepsConfig }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef<HTMLDivElement[]>([]);

  function handleNext() {
    setCurrentStep((prev) => {
      if (prev === stepsConfig.length - 1) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  }

  useEffect(() => {
    if (stepRef.current[0] && stepRef.current[stepsConfig.length - 1]) {
      setMargins({
        marginLeft: stepRef.current[0].offsetWidth,
        marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth,
      });
    }
  }, [stepsConfig.length]);

  function calculateProgressBar() {
    return (currentStep / (stepsConfig.length - 1)) * 100;
  }

  const ActiveComponent = stepsConfig[currentStep].Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          const isLast = index == stepsConfig.length - 1;
          const isCompleted = currentStep > index || (isComplete && isLast);
          const isActive = !isComplete && currentStep === index;
          return (
            <div className="step-item" key={step.name}>
              <div
                ref={(el) => (stepRef.current[index] = el)}
                className={`step-number ${isCompleted ? "complete" : ""} ${
                  isActive ? "active" : ""
                }`}
              >
                {isCompleted ? <span>&#10003;</span> : index + 1}
              </div>

              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
          className="progress-bar"
        >
          <div
            className="progress"
            style={{
              transform: `scaleX(${calculateProgressBar() / 100})`,
              transformOrigin: "left",
            }}
          ></div>
        </div>
      </div>

      <br />

      <ActiveComponent />

      <br />

      {!isComplete && (
        <button className="button" onClick={handleNext}>
          {currentStep === stepsConfig.length - 1 ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
}

export default Stepper;

// currentStep = 0 → (0 / 3) * 100 = 0%

// currentStep = 1 → (1 / 3) * 100 ≈ 33%

// currentStep = 2 → (2 / 3) * 100 ≈ 66%

// currentStep = 3 → (3 / 3) * 100 = 100%

// Now:

// Step 0 → scaleX(0) (invisible)

// Step 1 (33%) → scaleX(0.33)

// Step 2 (66%) → scaleX(0.66)

// Step 3 (100%) → scaleX(1) (full width)

// This keeps the element’s base width as 100%, but visually scales it.
