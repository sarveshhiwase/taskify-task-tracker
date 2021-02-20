import React from "react";

const SearchBar = ({ userdetails, logout, setSettingspage }) => {
  const imagesrc = `${process.env.REACT_APP_API}/users/${userdetails._id}/avatar`

  return (
    <>
      <header>
        <div className="container">
          <div className="smallmenu">
            <h1 className="inner-title">Taskify</h1>
            <img
              width="100"
              height="80"
              src="https://cdn.dribbble.com/users/173921/screenshots/2293040/colorful_logo.png"
              alt="websiteicon"
            />
          </div>
          <div className="listcontainer">
            {imagesrc && (
              <img
                width="50"
                height="50"
                src={imagesrc}
                style={{ borderRadius: "50%" }}
                alt="profilepic"
              />
            )}
            <button
              className="signoutbutton"
              onClick={() => setSettingspage(true)}
              style={{ marginRight: "32px" }}
            >
              {" "}
              Settings{" "}
            </button>

            <button className="signoutbutton" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default SearchBar;
