import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import "./NavPhone.css";
function NavPhone() {
  const location = useLocation();
  const [subNav,setSubNav] = useState(false);
  const activelink = location.pathname;

  const navlinks = [
    {
      link: "/",
      label: <IoMdHome className="icon icon-big" />,
      active: (activelink)=> activelink === "/"
    },
    {
      link: "/search",
      label: <FaSearch className="icon" />,
      active: (activelink) => activelink === "/search"
    },
    {
      label: <MdAddBox className="icon icon-big" />,
      active: (activelink) => (activelink === "/foundpost" || activelink === "lostpost"),
      links: [
        {
          label: "Found Post",
          link: "/foundpost",
        },
        {
          label: "Lost Post",
          link: "/lostpost",
        },
      ],
    },
    {
      link: "/profile",
      label: <FaUser className="icon" />,
      active: (activelink)=> activelink === "/profile"
    },
  ];
  return (
    <div className="navbar-phone">
      {navlinks.map((nav,idx) =>
        nav.link ? (
          <Link
           key={nav.link + idx}
            onClick={()=>setSubNav(false)}
            className={nav.active(activelink) ? "active" : ""}
            to={nav.link}
          >
            {nav.label}
          </Link>
        ) : (
          <div key={idx+subNav} onClick={() => setSubNav(prev => !prev)} className={`subnav ${nav.active(activelink) ? "active" : ""}`}>
            {nav.label}
          <div className={`links ${subNav ? "active": ""}`}>
          {nav.links.map((subnav ,idx) =>
          <Link
            key={subnav.link + idx}
            // className={activelink === subnav.link ? "active" : ""}
            to={subnav.link}
          >
            {subnav.label}
          </Link>)
          }
          </div>
          </div>
        )
      )}
    </div>
  );
}

export default NavPhone;
