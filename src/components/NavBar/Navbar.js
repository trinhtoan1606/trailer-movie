import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();

  const searchPage = (event) => {
    navigate("../Search");
  };

  const homePage = (event) => {
    navigate("../");
  };

  // Khi scroll quá 100px thanh navbar sẽ chuyển màu
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY >= 100);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbarContainer">
      <div className={`navbar ${showNavbar && "nav__black"}`}>
        {/* Khi click vào logo sẽ điều hướng về trang chủ */}
        <h2 className="nav__logo" onClick={homePage}>
          Movie App
        </h2>
        {/* Khi click vào nút search sẽ điều hướng về trang tìm kiếm */}
        <MdSearch className="nav__avatar" onClick={searchPage} />
      </div>
    </div>
  );
};

export default Navbar;
