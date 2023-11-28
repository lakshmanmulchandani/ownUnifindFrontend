import React, { useEffect, useState } from "react";
import "./comments.css";
import { HiDotsHorizontal } from "react-icons/hi";
import userIcon from "../../assets/user.svg";
import { MdEditNote } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import {  useOutletContext, useParams } from "react-router-dom";
import { getPost, postComment } from "../../Api/Api";
function Comments() {
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(null);
  const [input,setInput] = useState("");
  const params = useParams();
  const {refresh} = useOutletContext();
  const id = params.id;
  const handleSubmit = async () =>{
    if(input === "") return;
    setLoading(true);
    const response = await postComment(input,id);
    if(response.status === 200){
      const res = await getPost(id);
      setData(res.data.data);
      refresh();
      setLoading(false);
    }
  }
  useEffect(()=>{
    const fetchData = async () =>{
      const response = await getPost(id);
      setData(response.data.data)
    }
    fetchData();
  },[id])
  if(!id || !data) return;
  return (
    <div className="comments">
      <h1>Post Comments({data.comments.length})</h1>
      <div className="comment-list">
        {data.comments.map((comment,idx) =><Comment key={idx} user={comment.user} commentedOn={comment.commentedOn} comment={comment.comment} />)}
      </div>
      <div className="post-comment">
            <div className="post-input">
                <div><MdEditNote className="icon" /></div>
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Write your comment" />
                <button  disabled={loading} onClick={handleSubmit}>
                    <FiSend className="icon" />
                </button>
            </div>
      </div>
    </div>
  );
}

function Comment({ user, comment,commentedOn }) {
  return (
    <div className="comment">
      <div className="card-header">
        <div className="card-user">
          <div className="card-avatar">
            {
              <img
                src={!user.avatar  ? userIcon : user.avatar}
                alt={user.userName}
              />
            }
          </div>
          <span>
            <h1>{user.userName}</h1>
            <p>{(new Date(commentedOn).toDateString())}</p>
          </span>
        </div>
        <div>
          <HiDotsHorizontal className="icon"/>
        </div>
      </div>
      <p>{comment}</p>
    </div>
  );
}

export default Comments;
