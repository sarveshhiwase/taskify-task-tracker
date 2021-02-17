import React from "react";

const Login = ({ setLoggedIn, setLoading, setError, error }) => {
  const apiUrl = `${process.env.REACT_APP_API}/users/login`;
  const formhandler = async (e) => {
    if (error) {
      setError(false);
    }
    e.preventDefault();
    setLoading(true);
    const userdata = {
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
    // console.log(result)
    const data = await result.json();
    // console.log(data);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
    } else {
      setError(data.error);
      // console.log("There was error");
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
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />

        <button className="homebutton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
