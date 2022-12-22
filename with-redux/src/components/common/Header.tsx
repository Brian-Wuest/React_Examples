import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink
        to="/"
        style={(props: { isActive: boolean; isPending: boolean }) => {
          return props.isActive ? activeStyle : {};
        }}
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/courses"
        style={(props: { isActive: boolean; isPending: boolean }) => {
          return props.isActive ? activeStyle : {};
        }}
      >
        Courses
      </NavLink>{" "}
      {" | "}
      <NavLink
        to="/about"
        style={(props: { isActive: boolean; isPending: boolean }) => {
          return props.isActive ? activeStyle : {};
        }}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Header;
