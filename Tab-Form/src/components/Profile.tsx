import React from "react";

type ProfileProps = {
  data: {
    name: string;
    interests: string[];
    theme: string;
    email: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      interests: string[];
      theme: string;
      email: string;
    }>
  >;
  errors: any;
};
function Profile({ data, setData, errors }: ProfileProps) {
  const { name, email } = data;

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) {
    setData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  }

  return (
    <div>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => onChangeHandler(e, "name")}
        />
      </div>
      <br />
      {errors.name && name.length < 2 && (
        <span className="error">{errors.name}</span>
      )}
      <br />
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => onChangeHandler(e, "email")}
        />
      </div>
      <br />
      {errors.email && email.length < 2 && (
        <span className="error">{errors.email}</span>
      )}
    </div>
  );
}

export default Profile;
