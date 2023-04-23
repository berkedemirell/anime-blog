import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Menu = ({cat, id,post}) => {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)
      } catch(err) {
        console.log(err)
      }
    };
    fetchData();
  }, [cat]);
  

    // const posts = [
    //     {
    //         id:1,
    //         title:'My Hero Academia',
    //         desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eum non velit, aliquam eaque libero? Sequi inventore odio quae quidem deleniti cumque nemo nihil ullam, adipisci consequatur assumenda, obcaecati tenetur.',
    //         img: 'https://images8.alphacoders.com/707/thumbbig-707447.webp'
    //     },
    //     {
    //         id:2,
    //         title:'Demon Slayer',
    //         desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eum non velit, aliquam eaque libero? Sequi inventore odio quae quidem deleniti cumque nemo nihil ullam, adipisci consequatur assumenda, obcaecati tenetur.',
    //         img: 'https://images2.alphacoders.com/100/thumbbig-1008472.webp'
    //     },
    //     {
    //         id:1,
    //         title:'Haikyuu!',
    //         desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque eum non velit, aliquam eaque libero? Sequi inventore odio quae quidem deleniti cumque nemo nihil ullam, adipisci consequatur assumenda, obcaecati tenetur.',
    //         img: 'https://images8.alphacoders.com/692/thumbbig-692745.webp'
    //     },
    // ]
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {
        posts.map((post) => {
            return (
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`} alt=""/>
                    <h2>{post.title}</h2>
                    <Link to={`../post/${post.id}`}><button>Full content...</button></Link>
                </div>
            )
        })
      }
    </div>
  );
};
