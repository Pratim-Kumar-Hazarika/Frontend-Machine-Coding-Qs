import React from "react";

type SettingsProps = {
  data: {
    name: string;
    interests: string[];
    theme: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      interests: string[];
      theme: string;
    }>
  >;
  errors: any;
};

function Settings({ data, setData, errors }: SettingsProps) {
  const { theme } = data;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prevState) => ({
      ...prevState,
      theme: e.target.name,
    }));
  }
  return (
    <div>
      <div>
        <label>
          <input
            onChange={(e) => handleChange(e)}
            checked={theme === "Dark"}
            type="radio"
            name="Dark"
          />{" "}
          Dark
        </label>
      </div>
      <div>
        <label>
          <input
            onChange={(e) => handleChange(e)}
            checked={theme === "Light"}
            type="radio"
            name="Light"
          />{" "}
          Light
        </label>
      </div>
    </div>
  );
}

export default Settings;
