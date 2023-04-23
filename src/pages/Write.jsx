import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";


export const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate()
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date:moment(Date.now()).format("YYYY-MM-DD-HH:mm:ss")
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    currentUser ? <div className="write">
    <div className="content">
      <input
        className="title-input"
        value={title}
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="editorContainer">
        <ReactQuill
          className="editor"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
    <div className="menu">
      <div className="item">
        <label className="upload-img-label" htmlFor="file">
          Upload Image
        </label>
        <input
          className="upload-img-input"
          type="file"
          name=""
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="btns">
          <button className="btn-save">Save as a draft</button>
          <button className="btn-update" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="item2">
        <h1 className="cat-title">Category</h1>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "shoujo"}
            name="cat"
            value="shoujo"
            id="shoujo"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="shoujo">Shoujo</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "shuonen"}
            name="cat"
            value="shuonen"
            id="shuonen"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="shuonen">Shuonen</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "ecchi"}
            name="cat"
            value="ecchi"
            id="ecchi"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="ecchi">Ecchi</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "josei"}
            name="cat"
            value="josei"
            id="josei"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="josei">Josei</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "seinen"}
            name="cat"
            value="seinen"
            id="seinen"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="seinen">Seinen</label>
        </div>
        <div className="cat">
          <input
            type="radio"
            checked={cat === "others"}
            name="cat"
            value="others"
            id="others"
            onChange={(e) => setCat(e.target.value)}
          />
          <label htmlFor="others">Others</label>
        </div>
      </div>
    </div>
  </div> : <h1 className="write-fail">You have to be part of our community to share your thoughts.{<Link to="/register" className="write-register-link">To be a member please click.</Link>}</h1>
  );
};
