

import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from "react-quill";
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export const Comment = () => {
    const {currentUser} = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const location = useLocation();
    const [value,setValue] = useState("")
    // const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/${postId}/comments`)
            setComments(res.data)
          } catch(err) {
            console.log(err)
          }
        };
        fetchData();
    }, [postId]);


    // const handleDelete = async () => {
    //     try {
    //         await axios.delete(`/posts/${postId}/comments`)
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/posts/${postId}/comments`, { 
                comment: value,
                cusername: currentUser?.username,
                cimg: `../upload/${currentUser?.img}`,
                pid: postId,
            })
            window.location.reload(true);

        } catch(err) {
            console.log(err)
        }
    }

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent;
      }

  return (
    <div className='comment-container'>
        <div className='line-comment'></div>
        {currentUser ? <div className='add-comment'>
            <h3>Hi {currentUser ? currentUser?.username : "Stranger"}, add a comment:</h3>
            <ReactQuill
            className="editor-comment"
            theme="snow"
            value={value}
            onChange={setValue}
            />
            <button className='add-comment-btn' onClick={handleSubmit}>Submit</button>
        </div> : ""}
        {comments.length === 0 ? "" : <h3 className='comment-header'>Comments({comments.length})</h3>}
        {comments?.map((comment) => {
            return (
                <div className='comment-user-container'>

                    <div className='comment-user'>
                        {/* <img src={`../upload/${comment?.cimg}`} className='comment-user-img' alt=''/> */}
                        <p className='comment-user-username'>{comment?.cusername}{comment?.id}:</p>
                    </div>
                    <div className='comment'>
                        <p className='comment-content'>{getText(comment?.comment)}</p>
                    </div>
                    {/* <button className='com-delete' onClick={handleDelete}>Delete</button> */}
                </div>

            )
        })}
    </div>
  )
}

export default Comment