import React, { useEffect, useRef, useState } from "react";

type OtpInputProps = {
  length: number;
  onOtpSubmit: (otp: string) => void;
};
function OtpInput({ length = 4, onOtpSubmit }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");

    //Move to next empty input index
    if (value) {
      const nextEmptyIndex = newOtp.findIndex(
        (val, i) => i !== index && val == ""
      );
      if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
        inputRefs.current[nextEmptyIndex].focus();
      }
    }

    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  }

  function handleClick(index: number) {
    inputRefs.current[index]?.setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            value={value}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            autoFocus
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
}

export default OtpInput;
