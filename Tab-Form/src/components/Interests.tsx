import React from "react";

type InterestsProps = {
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
function Interests({ data, setData, errors }: InterestsProps) {
  const { interests } = data;
  function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((prevData) => ({
      ...prevData,
      interests: e.target.checked
        ? [...prevData.interests, e.target.name]
        : prevData.interests.filter((i) => i !== e.target.name),
    }));
  }
  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            name="music"
            checked={interests.includes("music")}
            onChange={(e) => handleDataChange(e)}
          />
          Music
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={interests.includes("coding")}
            onChange={(e) => handleDataChange(e)}
          />
          Coding
        </label>
      </div>
    </div>
  );
}

export default Interests;
