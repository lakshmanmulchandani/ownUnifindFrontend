import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./foundPost.css";
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
import { createPost, deletePost } from "../../Api/Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { resizeImage } from "../../utils";
function FoundPost() {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { refresh } = useOutletContext();
  const webcamRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef, setImageSrc]);
  const handleCaptureAgain = () => {
    setImageSrc(null);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const imgResized = await resizeImage(imageSrc,1024,720);
    const response = await createPost(
      description,
      tag,
      location,
      imgResized,
      "found"
    );
    if (response.status === 200) {
      response.data.post.user = response.data.user;
      setData(response.data.post);
      // setPosts(prev => )
      setModalOpen("welldone");
      refresh();
      setLoading(false);
    }
  };

  return (
    <div className="found-post">
      {!imageSrc ? (
        <div className="webcam-container">
          <h1>Camera</h1>
          <Webcam
            className="webcam"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button title="Capture" onClick={capture}>
            {" "}
          </button>
        </div>
      ) : (
        <div className="post-container">
          <h1>Found Post</h1>
          {!data ? (
            <>
              <div className="post-image">
                <img src={imageSrc} alt="post" />
                <button disabled={loading} onClick={handleCaptureAgain}>
                  <img alt="camera" src={cameraIcon} />
                  <p>Capture Again</p>
                </button>
              </div>
              <div className="post-form">
                <div>
                  <h1>Drop Location</h1>
                  <input
                    type="text"
                    placeholder="Enter Location"
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
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                 disabled={loading}
                  onClick={() => {
                    if (
                      description === "" ||
                      tag === "" ||
                      imageSrc === null ||
                      location === ""
                    ) {
                      alert("Please enter all required information");
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
                    <p>{new Date(data.createdAt).toDateString()}</p>
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
                  <p>Where to Find : {data.location}</p>
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
                  <p>{data.status === "resolved" ? "Found" : "Not Found"}</p>
                </button>
              </div>
              <button
                className="btn-primary"
                style={{
                  backgroundColor: "red",
                }}
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  const response = await deletePost(data._id);
                  alert("post deleted successfully");
                  if (response.status === 200) navigate("/");
                }}
              >
                Delete
              </button>
              <button onClick={() => navigate("/")} className="btn-primary">
                Done
              </button>
            </>
          )}
        </div>
      )}
      {modalOpen === "createpost" ? (
        <Modal open={modalOpen} setOpen={setModalOpen}>
          <div onClick={(e) => e.stopPropagation()} className="dialog center">
            <img src={foundpostimg} alt="createpost" />
            <h1>Create Post?</h1>
            <b>Post This For Helping Someone to Find Item</b>
            <button onClick={handleSubmit} disabled={loading} className="btn-primary">
              Confirm
            </button>
            <button
              disabled={loading}
              onClick={() => setModalOpen("")}
              className="btn-primary white"
            >
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
            <b>Post This For Helping Someone To Find Item</b>
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

export default FoundPost;
