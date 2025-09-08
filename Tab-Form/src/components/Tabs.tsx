import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";

function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState<{
    name: string;
    interests: string[];
    theme: string;
    email: string;
  }>({
    name: "",
    interests: [],
    theme: "Dark",
    email: "",
  });
  const tabsConfig = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (data.name.length < 1) {
          err.name = "Please enter your name";
        }
        if (data.email.length < 1) {
          err.email = "Please enter your email";
        }
        setErrors(err);
        return data.name.length < 1 || data.email.length < 1 ? false : true;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const err = {};
        if (!data.interests.length < 1) {
          err.interests = "Please select atleast 1 interest";
        }
        setErrors(err);
        return data.interests.length < 1 ? true : false;
      },
    },
    {
      name: "Setting",
      component: Settings,
      validate: () => {
        return false;
      },
    },
  ];
  function handleTabChange(index: number) {
    setActiveIndex(index);
  }
  const ActiveTabComponent = tabsConfig[activeIndex].component;
  function prevClickHandler() {
    if (tabsConfig[activeIndex].validate()) {
      setActiveIndex((prev) => prev - 1);
    }
  }
  function nextClickHandler() {
    if (tabsConfig[activeIndex].validate()) {
      setActiveIndex((prev) => prev + 1);
    }
  }
  return (
    <div>
      <div className="tabs-container">
        {tabsConfig.map((item, index) => (
          <div className="tabs" onClick={() => handleTabChange(index)}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <div className="tab-item">
        <ActiveTabComponent errors={errors} setData={setData} data={data} />
      </div>
      {activeIndex > 0 && <button onClick={prevClickHandler}>Prev</button>}
      {activeIndex < tabsConfig.length - 1 && (
        <button onClick={nextClickHandler}>Next</button>
      )}
      {activeIndex === tabsConfig.length - 1 && <button>Submit</button>}
    </div>
  );
}

export default Tabs;
