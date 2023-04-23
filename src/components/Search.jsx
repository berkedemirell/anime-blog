import React from "react";
import { Link } from "react-router-dom";

export const Search = ({ query, posts }) => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return posts
    .filter((post) => {
      // if (post.title.toLowerCase().includes(query.toLowerCase())) return post;
      return post.title.toLowerCase().includes(query.toLowerCase())
    })
    .map((post) => {
      return (
        <div className="post" key={post.id}>
          <div className="image">
            <img src={`../upload/${post.img}`} alt="" />
          </div>
          <div className="content">
            <h1>{post.title}</h1>
            <p>
              {getText(post.desc).split(".")[0]}
              {getText(post.desc).split(".")[1]}...
            </p>
            <Link to={`/post/${post.id}`}>
              <button>Read More...</button>
            </Link>
          </div>
        </div>
      );
    });
};
