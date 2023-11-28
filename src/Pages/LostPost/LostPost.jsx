import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./lostPost.css";
import cameraIcon from "../../assets/camera.svg";
import Modal from "../../components/Modal";
import foundpostimg from "../../assets/createpost.svg";
import welldoneimg from "../../assets/welldone.svg";
import { HiDotsHorizontal } from "react-icons/hi";
import tagIcon from "../../assets/tag.svg";
import locationIcon from "../../assets/location.svg";
import messageIcon from "../../assets/message.svg";
import linkIcon from "../../assets/link.svg";
import searchIcon from "../../assets/search.svg";
import userIcon from "../../assets/user.svg";
import uploadIcon from "../../assets/upload.svg";
import { createPost, deletePost } from "../../Api/Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { resizeImage } from "../../utils";
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
function LostPost() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const {refresh} = useOutletContext()

  const handleFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;
      try {
        const base64 = await convertFileToBase64(file);
        setImageSrc(base64);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    const imgResized = await resizeImage(imageSrc,1024,720);
    const response = await createPost(
      description,
      tag,
      location,
      imgResized,
      "lost"
    );
    if (response.status === 200) {
      response.data.post.user = response.data.user;
      setData(response.data.post);
      refresh()
      setModalOpen("welldone");
      setLoading(false);
    }
  };
  const handleUploadAgain = () => {
    setImageSrc(null);
  };

  return (
    <div className="lost-post">
      <div className="post-container">
        <h1>Lost Post</h1>
        {!data ? (
          <>
            <div className="post-image">
              {!imageSrc ? (
                <label htmlFor="file">
                  <div className="upload-image">
                    <img src={uploadIcon} alt="upload" />
                    <p>Add a Photo From Library</p>
                    <input id="file" type="file" onChange={handleFile} />
                  </div>
                </label>
              ) : (
                <>
                  <img src={imageSrc} alt="post" />

                  <button onClick={handleUploadAgain}>
                    <img alt="camera" src={cameraIcon} />
                    <p>Change Image</p>
                  </button>
                </>
              )}
            </div>
            <div className="post-form">
              <div>
                <h1>Drop Location</h1>
                <input
                  type="text"
                  placeholder="Location Last Spotted"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <h1>Add Tag</h1>
                <input
                  type="text"
                  placeholder="Add Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div>
                <h1>Write a Description</h1>
                <input
                  type="text"
                  placeholder="Write a Description About Your Item"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
               disabled={loading}
                onClick={() => {
                  if (!location && !tag && !description && !imageSrc) {
                    alert("All fields are required");
                    return;
                  }

                  setModalOpen("createpost");
                }}
                className="btn-primary"
              >
                Post
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="card-image">
              <img src={data.imageSrc} alt={data.itemDescription} />
            </div>
            <div className="card-header">
              <div className="card-user">
                <div className="card-avatar">
                  {
                    <img
                      src={!data.user.avatar ? userIcon : data.user.avatar}
                      alt={data.user.userName}
                    />
                  }
                </div>
                <span>
                  <h1>{data.user.userName}</h1>
                  <p>{(new Date(data.createdAt)).toDateString()}</p>
                </span>
              </div>
              <div>
                <HiDotsHorizontal
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "currentcolor",
                  }}
                />
              </div>
            </div>
            <div className="card-description">
              <p>{data.itemDescription}</p>
            </div>
            <div className="card-tags">
              <div>
                <img src={tagIcon} alt="tag" />
                <p>Tag : {data.itemTag}</p>
              </div>
              <div>
                <img src={locationIcon} alt="tag" />
                <p>Location Last Spotted : {data.location}</p>
              </div>
            </div>
            <div className="card-footer">
              <button>
                <img src={messageIcon} alt="message icon" />
                <p>{data.comments ? data.comments.length : 0}</p>
              </button>
              <button>
                <img src={linkIcon} alt="Link Icon" />
                <p>Share</p>
              </button>
              <button>
                <img src={searchIcon} alt="Search Icon" />
                <p>{data.isFound ? "Found" : "Not Found"}</p>
              </button>
            </div>
            <button
             disabled={loading}
              className="btn-primary"
              style={{
                backgroundColor: "red",
              }}
              onClick={async()=>{
                setLoading(true);
                const response = await deletePost(data._id);
                alert("post deleted successfully")
                if(response.status === 200) navigate("/")
              }}
            >
              Delete
            </button>
            <button disabled={loading} onClick={()=>navigate("/")} className="btn-primary">Done</button>
          </>
        )}
      </div>
      {modalOpen === "createpost" ? (
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <div onClick={(e) => e.stopPropagation()} className="dialog center">
            <img src={foundpostimg} alt="createpost" />
            <h1>Create Lost Post?</h1>
            <b>I Lost My This Item And I Want To Create a Post to Find It</b>
            <button disabled={loading} onClick={handleSubmit} className="btn-primary">
              Confirm
            </button>
            <button disabled={loading} onClick={() => setModalOpen("")} className="btn-primary white">
              Cancel
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {modalOpen === "welldone" ? (
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <div onClick={(e) => e.stopPropagation()} className="dialog center">
            <img src={welldoneimg} alt="createpost" />
            <h1>Well-Done</h1>
            <b>Hope You Find Your Item Soon, Good Luck</b>
            <button onClick={() => setModalOpen("")} className="btn-primary">
              Okay
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default LostPost;
