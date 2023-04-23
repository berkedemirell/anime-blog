import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext.js";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import ReactQuill from "react-quill";

export const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useLocation().state;
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [value, setValue] = useState(state?.userdesc || "")
  const [file, setFile] = useState(state?.img || null);

  const userId = location.pathname.split("/")[2];

  const { logout } = useContext(AuthContext);

  console.log(currentUser?.id)
  console.log(userId);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user.id}`);
      logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${userId}`)
        setUser(res.data)
      } catch(err) {
        console.log(err)
      }
    };
    fetchData();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/users/${state.id}`, {
            img: file ? imgUrl : "",
            userdesc: value,
          })
        : await axios.post(`/users/${state.id}`, {
            img: file ? imgUrl : "",
            userdesc: value,
          });
        navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      {currentUser ? <div className="user-info-container">
        <div className="user-info-img">
          <label htmlFor="">
            <img src={`../upload/${user?.img}`} alt="" className="user-image" />
          </label>
          {Number(currentUser?.id) === Number(userId) ? <div className="profile-deneme"><label className="upload-img-label" htmlFor="file">
            Add a Profile Picture
          </label>
          <input
            className="upload-img-input"
            type="file"
            name=""
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="btn-falan" onClick={handleSave}>
            Save
          </button>
          <button className="btn-falan2" onClick={() => setShow((prev) => !prev)}>
            Edit
          </button> </div> : ""}
        </div>
        <div className="user-info-container-2">
          <h4 className="user-name">{user?.username}</h4>
          <div className="editorContainer">
            {show && <ReactQuill
              className={`editor`}
              theme="snow"
              onChange={setValue}
              value={value}
            /> }
            {!show ? <p className="user-info">{getText(user?.userdesc)}</p> : ""}
        </div>
        </div>
      </div> : <div className="profile-err-div"><h1 className="profile-err">You are not allowed to see this page.</h1></div>}
      {Number(currentUser?.id) === Number(userId) ? <Link onClick={handleDelete}><button className="delete-pro-btn">
        Delete Profile
      </button></Link> : ""}
      <div className="line"></div>
    </div>
  );
};
