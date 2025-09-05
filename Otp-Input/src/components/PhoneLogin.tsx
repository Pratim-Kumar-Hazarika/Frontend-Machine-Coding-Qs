import React, { useState } from "react";
import OtpInput from "./OtpInput";

function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loginSuccessFull, setLoginSuccessFull] = useState(false);
  function handlePhoneSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber?.length < 10 && regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    setShowOtpInput(true);
  }

  function handlePhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.currentTarget.value);
  }
  function onOtpSubmit(otp: string) {
    console.log("Login  successful 🚀", otp);
    setLoginSuccessFull(true);
  }
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={(e) => handlePhoneSubmit(e)}>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumber(e)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <div>Otp sent to {phoneNumber}</div>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          {loginSuccessFull && "You are logged in 😁 "}
        </div>
      )}
    </div>
  );
}

export default PhoneLogin;
