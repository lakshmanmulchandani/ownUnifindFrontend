import React, { useEffect, useState } from "react";
import "./ClaimItem.css";
import { HiDotsHorizontal } from "react-icons/hi";
import tagIcon from "../../assets/tag.svg";
import locationIcon from "../../assets/location.svg";
import messageIcon from "../../assets/message.svg";
import linkIcon from "../../assets/link.svg";
import searchIcon from "../../assets/search.svg";
import userIcon from "../../assets/user.svg";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import claimitem1 from "../../assets/claimitem1.svg";
import good from "../../assets/good.svg";
import { FRONTEND_URL } from "../../constants";
import { claimItem, getPost } from "../../Api/Api";
function ClaimItem() {
  const [loading,setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  const [data, setData] = useState(null);
  const {refresh} = useOutletContext()
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await claimItem(id);
    if (res.status === 200) {
      setModalOpen("welldone");
      refresh();
      setLoading(false);
    }
  };
  async function copyText() {
    const link = `${FRONTEND_URL}/claimitem/` + data._id;
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    } catch (e) {
      alert("Falied to Copy to Clipboard!. Here is the sharing link: " + link);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPost(id);
      setData(response.data.data);
    };
    fetchData();
  }, [id]);
  if (!data || !id) return;
  return (
    <div className="claim-item card">
      <h1>Claim Your Item</h1>
      <div className="card-image">
        <img src={data.imageSrc} alt={data.itemDescription} />
      </div>
      <div className="card-header">
        <div className="card-user">
          <div className="card-avatar">
            {
              <img
                src={!data.user.avatar ? userIcon : data.avatar}
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
        <button onClick={() => navigate("/comments/" + data._id)}>
          <img src={messageIcon} alt="message icon" />
          <p>{data.comments ? data.comments.length : 0}</p>
        </button>
        <button onClick={copyText}>
          <img src={linkIcon} alt="Link Icon" />
          <p>Share</p>
        </button>
        <button>
          <img src={searchIcon} alt="Search Icon" />
          <p>{data.status === "resolved" ? "Found" : "Not Found"}</p>
        </button>
      </div>
      <button
        onClick={() => setModalOpen("claimitem")}
        disabled={data.status === "resolved"}
        className={`btn-primary ${data.status === "resolved" ? "white" : ""}`}
      >
        {data.status === "resolved" ? "Item Claimed" : "Claim Your Item  "}
      </button>
      <Modal open={modalOpen === "claimitem"} setOpen={setModalOpen}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="dialog collectitem"
        >
          <img src={claimitem1} alt="claimitem1" />
          <h1>Claim Your Item</h1>
          <b>You can collect after you claiming it.</b>
          <button  disabled={loading} onClick={handleSubmit} className="btn-primary">
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
      <Modal
        onClick={(e) => e.stopPropagation()}
        open={modalOpen === "welldone"}
        setOpen={() => {}}
      >
        <div className="dialog collectitem">
          <img src={good} alt="claimitem1" />
          <h1>Item Claimed!</h1>
          <b>You can collect your item , Thank you!.</b>
          <button
            onClick={() => {
              setModalOpen("");
              navigate("/");
            }}
            className="btn-primary"
          >
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ClaimItem;
