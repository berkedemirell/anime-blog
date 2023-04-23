


import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Menu} from '../components/Menu.jsx'
import axios from 'axios';
import moment from "moment";
import {AuthContext} from "../context/authContext.js"
import {Comment} from '../components/Comment.jsx';

export const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  console.log(post)

  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      } catch(err) {
        console.log(err)
      }
    };
    fetchData();
  }, [postId]);


  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }


  return (
    <div className='single'>
      <div className='content'>
        <img src={`../upload/${post?.img}`} alt=''/>
        <div className='user'>
          {`../upload/${post.userImg}` && <img src={`../upload/${post.userImg}`} alt=''/>}
          <div className='info'>
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>

          {currentUser?.username === post?.username && <div className='edit'>
            <Link to={`/write?edit=`} state={post}><p>Edit</p></Link>
            <Link onClick={handleDelete}><p className='delete'>Delete</p></Link>
          </div>}
        </div>
        <h1 className='title'>{post?.title}</h1>
        <p className='content-par'>{getText(post?.desc)}</p>
      <Comment post={post}/>
      </div>
      <Menu cat={post.cat} post={post}/>
      
      
    </div>
  )
}
