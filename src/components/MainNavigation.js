import React, { useContext } from "react";

import classes from "./MainNavigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../store/user-context";
import logo from "../img/favicon.png";
function MainNavigation() {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  return (
    <header className={classes.header}>
      <img
        className={classes.logo}
        src={logo}
        alt="logo"
        onClick={() => navigate("/homepage")}
      />
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/homepage"
            className={({ isActive }) => (isActive ? classes.active : " ")}
            onClick={(e) => {
              // e.preventDefault();
              userCtx.isGetData = false;
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) => (isActive ? classes.active : " ")}
            onClick={(e) => {
              // e.preventDefault();
              userCtx.isGetData = true;
            }}
            end
          >
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs/profile"
            className={({ isActive }) => (isActive ? classes.active : " ")}
            onClick={(e) => {
              // e.preventDefault();
              userCtx.isGetData = true;
            }}
          >
            My Blog
          </NavLink>
        </li>
      </ul>
      <div className={classes.info}>
        <img
          className={classes.img}
          src={userCtx.user.photoURL}
          alt="image actor"
        ></img>
        <div className={classes["detail-info"]}>
          <p className={classes.name}>{userCtx.user.displayName}</p>
          <p className={classes.email}>{userCtx.user.email}</p>
          <button onClick={logout} className={classes.logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
export default MainNavigation;
