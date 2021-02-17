import React from "react";

const SignUp = ({ setLoggedIn, setLoading, setError, error }) => {
  const apiUrl = `${process.env.REACT_APP_API}/users`;
  const formhandler = async (e) => {
    if (error) {
      setError(false);
    }
    e.preventDefault();
    setLoading(true);
    const userdata = {
      name: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });
    const data = await result.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex-center">
      <form onSubmit={formhandler} className="flex">
        <img
          src="https://cdn.dribbble.com/users/173921/screenshots/2293040/colorful_logo.png"
          height="100"
          width="100"
          alt="icon"
        />
        <input
          autoComplete="off"
          name="username"
          type="text"
          placeholder="Enter Your name"
          required
        />
        <input
          autoComplete="off"
          name="email"
          type="email"
          placeholder="Enter Email"
          required
        />
        <input
          autoComplete="off"
          name="password"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
          type="password"
          placeholder="Enter Password"
        />
        <cite style={{ fontSize: "12px" }}>
          Password must be 8 characters long, should contain atleast 1
          lowercase,uppercase,number and symbol
        </cite>

        <button className="homebutton" type="submit">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
