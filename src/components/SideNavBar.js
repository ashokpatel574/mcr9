import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const SideNavBar = () => {
  return (
    <aside className="sideNav_container">
      <ul className="sideNav_list flex-column">
        <li className="sideNav_listItem">
          <NavLink to="/">
            <span>
              <HomeIcon />
            </span>
            Home
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="explore">
            <span>
              <ExploreIcon />
            </span>
            Explore
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="playlist">
            <span>
              <PlaylistAddIcon />
            </span>
            PlayLists
          </NavLink>
        </li>
        <li className="sideNav_listItem">
          <NavLink to="watchlater">
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
