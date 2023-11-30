import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import NavPhone from "./components/NavPhone/NavPhone";
import { useCallback, useEffect, useState } from "react";
import { getAllPosts } from "./Api/Api";
import { filterData } from "./utils";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [postType, setpostType] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [token, settoken] = useState(null);
  const [subNav, setSubNav] = useState(false);
  const [tags, setTags] = useState([]);
  const [postingTime, setPostingTime] = useState({
    label: "Newer",
    value: "newer",
  });
  const navigate = useNavigate();

  const handleTags = (tags) => {
    setTags(tags);
  };
  const handlePostingTime = (time) => {
    setPostingTime(time);
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const user = urlParams.get("user");
    if (token != null) {
      localStorage.setItem("token", JSON.stringify(token));
      settoken(token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    const ltoken = localStorage.getItem("token");
    if (!ltoken && !token) {
      navigate("/Welcome");
    } else if (ltoken) {
      settoken(ltoken);
    }
  }, [navigate]);

  const fetch = useCallback(async () => {
    if (!token) {
      return;
    }
    const response = await getAllPosts(
      postType === "All" ? "" : postType.toLowerCase()
    );
    setPosts(response.data.posts);
  }, [postType,token]);

  const refresh = () => {
    console.log("Refreshing...")
    setPostingTime({
      value: "newer",
      label: "Newer",
    });
    setpostType("All");
    setTags([]);
    fetch();
  };
  useEffect(() => {
    fetch();
  }, [fetch]);

  
  useEffect(() => {
    setFilteredPosts(filterData("", posts, tags, postingTime.value));
  }, [posts, tags, postingTime,setFilteredPosts]);
  

  if (token === null) {
    return "loading";
  }

  return (
    <div className="main-container">
      <header>
        <div className="logo">
          <Link to="/">UniFind</Link>
        </div>
        <div className="search">
          <div className="icon-container">
            <FaSearch className="icon" />
          </div>
          <input
            value={searchInput}
            onChange={handleSearchInput}
            onClick={()=>navigate("/search")}
            type="text"
            placeholder="Search By Item,Name,Location"
          />
        </div>
        <div className="side-btns">
          <button
            onClick={() => setSubNav((prev) => !prev)}
            className="btn pill subnav"
          >
            <MdAddBox className="icon blue" />
            <p>New Post</p>
            <div className={`links ${subNav ? "active" : ""}`}>
              <Link to="/foundpost">Found Post</Link>
              <Link to="/lostpost">Lost Post</Link>
            </div>
          </button>
          <Link to="/profile">
            <button className="btn rounded">
              <FaUser className="icon blue" />
            </button>
          </Link>
        </div>
      </header>
      <main className="main">
        <Outlet
          context={{
            searchInput,
            refresh,
            handleSearchInput,
            posts : filteredPosts,
            filteredPosts,
            setFilteredPosts,
            setPosts,
            setpostType,
            postType,
            tags,
            setTags: handleTags,
            setPostingTime: handlePostingTime,
            postingTime,
            filterData,
          }}
        />
      </main>
      <NavPhone />
    </div>
  );
}

export default App;
