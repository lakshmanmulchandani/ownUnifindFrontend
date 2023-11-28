import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import tagIcon from "../assets/tag.svg";
import locationIcon from "../assets/location.svg";
import messageIcon from "../assets/message.svg";
import linkIcon from "../assets/link.svg";
import searchIcon from "../assets/search.svg";
import userIcon from "../assets/user.svg";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URL } from "../constants";
function Card(props) {
  const navigate = useNavigate();
  const data = props.data;
  const user = data.user;
  const handleClick = () =>{
    // if(data.status === "resolved") return;
    navigate("/claimitem/"+data._id);
  }
  
  async function copyText() {
    const link = `${FRONTEND_URL}/claimitem/` + data._id;
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (e) {
      alert("Falied to Copy to Clipboard!. Here is the sharing link: " + link);
    }
  }
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-header">
        <div className="card-user">
          <div className="card-avatar">
            {
              <img
                src={!user?.avatar ? userIcon : user.avatar}
                alt={user.userName}
              />
            }
          </div>
          <span>
            <h1>{user.userName}</h1>
            <p>{(new Date(data.createdAt)).toDateString()}</p>
          </span>
        </div>
        <div onClick={(e)=>e.stopPropagation()} className="report">
          <HiDotsHorizontal
            style={{
              width: "1rem",
              height: "1rem",
              color: "currentcolor",
            }}
          />
          <button onClick={()=>navigate("/report/"+data._id)} className="popup">
            Report
          </button>
        </div>
      </div>
      <div className="card-tags">
        <div>
          <img src={tagIcon} alt="tag" />
          <p>{data.itemTag}</p>
        </div>
        <div>
          <img src={locationIcon} alt="tag" />
          <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/${data.location}`}><p>{data.location}</p></a>
        </div>
        <div>
          <p
            style={{
              color: "red",
            }}
          >
            {data.type === "found" ? "Found":"Lost" }
          </p>
        </div>
      </div>
      <div className="card-description">
        <p>{data.itemDescription}</p>
      </div>
      <div className="card-image">
        <img src={data.imageSrc} alt={data.description} />
      </div>
      <div className="card-footer">
        <button onClick={(e)=>{
          e.stopPropagation()  
          navigate('/comments/'+data._id)
        }}>
          <img src={messageIcon} alt="message icon" />
          <p>{data.comments ? data.comments.length : 0}</p>
        </button>
        <button onClick={(e) => {
          e.stopPropagation()
          copyText()
        }}
          >
          <img src={linkIcon} alt="Link Icon" />
          <p>Share</p>
        </button>
        <button>
          <img src={searchIcon} alt="Search Icon" />
          <p>{data.status === "resolved" ? "Found" : "Not Found"}</p>
        </button>
      </div>
    </div>
  );
}

export default Card;
