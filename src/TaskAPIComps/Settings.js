import React, { useState } from "react";
import AvatarUpload from "./AvatarUpload";
import Alert from "@material-ui/lab/Alert";

const Settings = ({ setSettingspage, userdetails }) => {
  const [error, setError] = useState(null);

  return (
    <div style={{ margin: "auto" }}>
      <img
        width="200"
        height="200"
        style={{ borderRadius: "50%" }}
        src={`${process.origin.REACT_APP_API}/users/${userdetails._id}/avatar`}
        alt="profilepic"
      />
      <AvatarUpload setError={setError} />
      {error && (
        <Alert
          style={{ width: "25%", margin: "auto" }}
          severity="error"
          onClose={() => setError(false)}
        >
          Error - {error}
        </Alert>
      )}
      <h1>{userdetails.name}</h1>
      <h1>{userdetails.email}</h1>
      <button onClick={() => setSettingspage(false)}> Back To Home</button>
    </div>
  );
};
export default Settings;
