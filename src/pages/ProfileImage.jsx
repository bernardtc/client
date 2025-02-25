import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import React, { useContext } from "react";
import axios from "axios";
import { Input } from "antd";
import avatarImage from "../assets/avatar.png";

const API_URL = "https://uplay.cyclic.cloud";

function ProfileImage() {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("");
  const { isLoggedIn, user, setUser } = useContext(AuthContext);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((err) =>
        console.log("what image error is there to show now lol", err)
      );
  };

  const handleImgSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/api/users`, { _id: user._id, image })
      .then((response) => {
        setUser(response.data.updatedUser);
        setImage("");
      })
      .catch((err) =>
        console.log("user imageUpdate error :) show===> me lol", err)
      );
  };

  return (
    <>
      <div>
        {isLoggedIn && (
          <>
            <div>
              {user && user.image ? (
                <img
                  src={user.image}
                  alt={"profile_image"}
                  style={{ width: "200px", height: "200px" }}
                />
              ) : (
                <img
                  src={avatarImage}
                  alt={"profile_image"}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              {!showUpload && (
                <button onClick={() => setShowUpload(!showUpload)}>
                  Edit Photo
                </button>
              )}
            </div>
            <div>
              {showUpload && (
                <form onSubmit={handleImgSubmit} className="updateImageForm">
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <button type="submit">Update Image</button>
                  <button
                    className="cancelEditButton"
                    onClick={() => setShowUpload(!showUpload)}
                    type="button"
                  >
                    Cancel Edit
                  </button>
                  
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileImage;
