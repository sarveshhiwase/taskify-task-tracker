import Login from "./TaskAPIComps/Login";
import Tasks from "./TaskAPIComps/Tasks";
import SignUp from "./TaskAPIComps/SignUp";
import SearchBar from "./TaskAPIComps/Searchbar";
import Settings from "./TaskAPIComps/Settings";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [promptlogin, setLoginprompt] = useState(true);
  const [userdetails, setUserdetails] = useState({});
  const [isloading, setLoading] = useState(false);
  const [settingspage, setSettingspage] = useState(false);

  const [isError, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const meurl = `${process.env.REACT_APP_API}/users/me`;
    fetch(meurl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) =>
        res
          .json()
          .then((data) => {
            if (data.user.name) {
              setUserdetails(data.user);
            } else {
              setLoading(false);
            }
          })
          .catch((err) => {
      console.log(err);
      setLoading(false);
    })
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userdetails.name) {
      setLoggedIn(true);
      setLoading(false);
    }
  }, [userdetails]);

  const logout = async () => {
    setLoading(true);
    const logoutURL = `${process.env.REACT_APP_API}/users/logout`;
    const result = await fetch(logoutURL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (result.status === 200) {
      localStorage.removeItem("token");
      setLoggedIn(false);
      setLoginprompt(true);
      setUserdetails({});
    } else {
      setError("There was problem with logging you out");
    }
    setLoading(false);
  };

  let sad = null;
  if (promptlogin) {
    sad = (
      <>
        <h1>
          <span className="title">Taskify</span>{" "}
          <span className="personal">- Your Personal Task Tracker</span>{" "}
        </h1>
        {!isLoggedIn && isError && (
          <Alert
            style={{ width: "25%", margin: "auto" }}
            severity="error"
            onClose={() => setError(false)}
          >
            Error - {isError}
          </Alert>
        )}
        <Login
          error={isError}
          setError={setError}
          setLoading={setLoading}
          setLoggedIn={setLoggedIn}
        />
      </>
    );
  } else {
    sad = (
      <>
        <h1>
          <span className="title">Taskify</span>{" "}
          <span className="personal">- Your Personal Task Tracker</span>{" "}
        </h1>
        {!isLoggedIn && isError && (
          <Alert
            style={{ width: "25%", margin: "auto" }}
            severity="error"
            onClose={() => setError(false)}
          >
            Error - {isError}
          </Alert>
        )}
        <SignUp
          error={isError}
          setError={setError}
          setLoading={setLoading}
          setLoggedIn={setLoggedIn}
        />
      </>
    );
  }
  let bad = null;
  if (settingspage) {
    bad = (
      <Settings userdetails={userdetails} setSettingspage={setSettingspage} />
    );
  } else {
    bad = (
      <>
        <SearchBar
          logout={logout}
          setSettingspage={setSettingspage}
          userdetails={userdetails}
        />
        {isError && (
          <Alert
            style={{ width: "25%", margin: "auto" }}
            severity="error"
            onClose={() => setError(false)}
          >
            Error - {isError}
          </Alert>
        )}
        <Tasks />
      </>
    );
  }
  return (
    <div className="App">
      {isloading ? (
        <LinearProgress />
      ) : (
        <>
          {!isLoggedIn && sad}

          {!isLoggedIn && (
            <span
              style={{
                color: "lightblue",
                marginTop: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setLoginprompt(!promptlogin)}
            >
              {promptlogin ? "SignUp Now" : "Login"}
            </span>
          )}
          {isLoggedIn && bad}
        </>
      )}
    </div>
  );
};

export default App;
