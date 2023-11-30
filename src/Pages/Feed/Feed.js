import React, { useCallback, useEffect, useState } from "react";
import "./feed.css";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { IoFilterSharp } from "react-icons/io5";
import AsyncSelect from 'react-select/async';
import { useLocation, useOutletContext } from "react-router-dom";
import Select from "react-select";
import { FaSearch } from "react-icons/fa";
import { getTags } from "../../Api/Api";
import { useNavigate } from "react-router-dom";




function Feed() {
  const outletcontext = useOutletContext();
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const {posts,searchInput,handleSearchInput,postType,setpostType,tags,setTags,postingTime,setPostingTime} = outletcontext;
  const navigate = useNavigate();
  
  const handleChange = (selectedOption) => {
    setTags(selectedOption);
  };

  const filterActive = (tags.length > 0|| postingTime.value === "older" );
  const handleFilter = () =>{
    setModalOpen(false);
  }
  const loadOptions = (q) =>new Promise(async (resolve, reject) =>{
    const res = await getTags(q);
    const ftags = res.data.tags.map(tag => ({value: tag.name,label: tag.name}))
    resolve(ftags)
  })




  return (
    <div className="feed">
      <div className="nav">
        <button onClick={() => setpostType("All")} className={postType === "All" ? "active": ""}>All</button>
        <button onClick={() => setpostType("Found")} className={postType === "Found" ? "active": ""}>Found</button>
        <button onClick={() => setpostType("Lost")} className={postType === "Lost" ? "active": ""}>Lost</button>
        <button onClick={() => setModalOpen(true)} className={filterActive ? "filter-active" : ""}><IoFilterSharp className="icon" /></button>
      </div>
      <div className="cards">{
        posts.map((post,idx) => <Card key={idx} data = {post} />)
      }</div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="filter dialog" onClick={(e)=>{e.stopPropagation()}}>
          <h1>
            <IoFilterSharp className="icon" />
            Select Filter
          </h1>
          <h2>By Tags </h2>
          <AsyncSelect className='select' cacheOptions isMulti loadOptions={loadOptions} options={tags} onChange={handleChange} defaultOptions={[]} /> 
          <h2>By Posting Time</h2>
          <Select className='select' cacheOptions options={[{value: "older",label: "Older"},{value: "newer",label:"Newer"}]} onChange={(opt)=>setPostingTime(opt)} value={postingTime}  /> 
        <button onClick={handleFilter} className="btn-primary">Done</button>
        </div>
      </Modal>
    </div>
  );
}

export default Feed;
