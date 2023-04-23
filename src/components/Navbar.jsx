import React, { useContext, useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${currentUser?.id}`)
        setUser(res.data)
      } catch(err) {
        console.log(err)
      }
    };
    fetchData();
  }, [currentUser?.id]);

  return (
    <div className="navbar sticky-nav">
      <div className="container">
        <div className="logo">
          <Link to="/"><img src="https://images8.alphacoders.com/505/505616.png" alt="lotr"/></Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=shuonen">Shuonen</Link>
          <Link className="link" to="/?cat=seinen">Seinen</Link>
          <Link className="link" to="/?cat=shoujo">Shoujo</Link>
          <Link className="link" to="/?cat=josei">Josei</Link>
          <Link className="link" to="/?cat=ecchi">Ecchi</Link>
          <Link className="link" to="/?cat=others">Others</Link>
          {currentUser && <Link className="link" to="/members">Members</Link>}
          {!currentUser && <Link className="link" to="/register">Register</Link>}
          {currentUser ? <Link className="link" to="/" onClick={logout}>Logout</Link> : <Link className="link" to="/login">Login</Link> }
          <span>{currentUser ? "Hi, " : ""}<Link to={`/user/${user.id}`} state={currentUser}><span className="user-name">{currentUser?.username}</span></Link></span>
          {currentUser && <Link className="link" to="/write">Post</Link>}
        </div>
      </div>
    </div>
  );
};
