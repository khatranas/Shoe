import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../scss/component/homepage/Heder.scss";
import Search from "../../assets/img/search.png";
import Vector from "../../assets/img/Vector.png";
import Nabar from "../../assets/img/nabar.png";
import { useRef } from "react";

export default function Heder() {
  const [search, setSearch] = useState("");

  const inputRef = useRef();

  const handleSearch = () => {
    setSearch("");
    inputRef.current.focus();
  };

  const checkUser = localStorage.getItem("accessToken");
  return (
    <div>
      <div className="Heder">
        <h2 className="Heder_logo">Shoppes</h2>
        <div className="menu-mobile-icon hide-on-pc">
          <img className="menu-mobile-icon-1" src={Nabar} alt="" />
        </div>
        <div className="Heder_list hide-on-mobile">
          <NavLink className="Heder_list_item" to="/">
            Home
          </NavLink>
          <NavLink className="Heder_list_item" to="/PageShop">
            Product
          </NavLink>
          {/* <NavLink className="Heder_list_item" to="/DetailBlog">Details </NavLink> */}
          <NavLink className="Heder_list_item" to="/Blog">
            Blog
          </NavLink>
        </div>
        <div className="Heder_list2 hide-on-mobile">
          <Link
            to={search && `PageShop/${search}`}
            className="Heder_list2-link"
            onClick={handleSearch}
          >
            <img className="Heder_list2_img2" src={Search} alt="" />
            <p className="Heder_list2_a">Search</p>
          </Link>
          <div className="Heder_list2-search">
            <input
              ref={inputRef}
              value={search}
              type="text"
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="Heder_list2_line"></div>

          {checkUser ? (
            "Đã đăng nhập"
          ) : (
            <p>
              <Link to="/login" className="Heder_list2_a1">
                {" "}
                Log in
              </Link>
            </p>
          )}
          <NavLink className="Heder_list_item" to="/EmptyProduct">
            <img className="Heder_list2_img" src={Vector} alt="" />{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}
