import { useEffect, useState, React } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Paginate } from "../components/Paginate.jsx";
import { Search } from "../components/Search.jsx";
// import moment from "moment";
// import ReactPaginate from "react-paginate";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [query, setQuery] = useState('')
  const cat = useLocation().search;
  // const [quote, setQuote] = useState()
  // const [deneme, setDeneme] = useState([])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
  if (currentPage !== Math.ceil(posts.length / postsPerPage)) {
     setCurrentPage(currentPage + 1);
  }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const sorted = posts?.map(post => {return {...post, date:new Date(post.date)}}).sort((a,b) => b.date - a.date)
  const currentPosts = sorted.slice(indexOfFirstPost, indexOfLastPost);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

 
    // const fetchQuote = async () => {

    //     const res = await axios.get("https://animechan.vercel.app/api/random")
    //     setQuote(res.data)

    // }



    // useEffect(() => {
    //   const fetchData1 = async () => {
    //     try {
    //       const res1 = await axios.get("/posts/47");
    //       setDeneme(JSON.stringify(res1.data))
    //     }catch(err) {
    //       console.log(err)
    //     }

    //   }
    //   fetchData1()
    // })
    // console.log(deneme)

    // const handleClickk = async () => {
    //   const fetchData1 = await axios.get("/posts");
    //   setDeneme(fetchData1.data)
    // }

    // console.log(deneme)




  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };


  return (
    <div className="home">
      <div className="helpers">

      {/* <p className="fact">{quote?.quote}</p> */}
      {/* <button onClick={fetchQuote}>bas</button> */}
      <input type="text" className="search-bar" placeholder="Search for a post" onChange={event => setQuery(event.target.value)}/>

      </div>
      <div className="posts">
        {query === "" ?
        currentPosts.map((post) => {
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
        }) : <Search posts={posts} query={query} setQuery={setQuery}/>
      }
      </div>
      {!cat ?
        <Paginate
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
     /> : ""
      }

      {/* <div><p>{deneme}</p><button onClick={handleClickk}>Bas KAnks</button></div> */}
    </div>
  );
};
