import React from "react";

const avatarUpload = ({ setError }) => {
  const formhandler = async (e) => {
    const types = ["image/jpg", "image/png", "image/jpeg"];
    e.preventDefault();
    if (
      e.target.avatar.files[0] &&
      types.includes(e.target.avatar.files[0].type)
    ) {
      const avatarurl = `http://localhost:5000/users/me/avatar`;
      const formdata = new FormData();
      formdata.append("avatar", e.target.avatar.files[0]);
      const result = await fetch(avatarurl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formdata,
      });
      if (result.status === 200) {
        console.log("file was uploaded successfully");
        window.location.reload();
      } else {
        console.log("file was not uploaded successfully,  please try again");
        setError("Please Try again, image could not be uploaded");
      }
    } else {
      setError("Please Select File and with jpg,png and jpeg extension");
    }
    e.target.reset();
  };
  return (
    <div>
      <form method="POST" encType="multipart/form-data" onSubmit={formhandler}>
        <input
          name="avatar"
          type="file"
          placeholder="Upload Your Profile pic"
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default avatarUpload;
