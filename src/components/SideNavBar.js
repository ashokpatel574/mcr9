import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const SideNavBar = () => {
 
  function NavLinkStyle({ isActive }) {
    return { color: isActive && "blue" };
  }
  return (
    <aside className="sideNav_container">
      <ul className="sideNav_list flex-column">
        <li className="sideNav_listItem">
          <NavLink to="/" style={NavLinkStyle}>
            <span>
              <HomeIcon />
            </span>
            Home
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="explore" style={NavLinkStyle}>
            <span>
              <ExploreIcon />
            </span>
            Explore
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="playlist" style={NavLinkStyle}>
            <span>
              <PlaylistAddIcon />
            </span>
            PlayLists
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="watchlater" style={NavLinkStyle}>
            <span>
              <WatchLaterIcon />
            </span>
            WatchLater
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideNavBar;
