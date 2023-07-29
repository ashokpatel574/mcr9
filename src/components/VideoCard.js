import React from "react";
import { useNavigate } from "react-router";
import avatar from "../assets/avatar/avatar-3.png";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { useData } from "../context/DataContext";

const VideoCard = ({ videoItem }) => {
  const navigate = useNavigate();

  const pageNavHandler = (videoId, categoryId) => {
    navigate(`/category/${categoryId}/${videoId}`);
  };

  const {
    state: { userData },
    dispatch,
  } = useData();

  const inWishlist = userData.wishlistData?.some(
    (item) => item._id === videoItem._id
  );

  const wishlistHandler = (video) => {
    inWishlist
      ? dispatch({ type: "RemoveFromWishlist", payload: video?._id })
      : dispatch({
          type: "AddToWishlist",
          payload: video,
        });
  };

  console.log(userData.wishlistData);

  return (
    <li>
      <div className="part-one">
        <img
          onClick={() => pageNavHandler(videoItem._id, videoItem.category)}
          src={videoItem.thumbnail}
          alt={videoItem.title}
          className="imgCover"
        />

        {inWishlist ? (
          <span
            className="addedWishList"
            onClick={() => wishlistHandler(videoItem)}
          >
            <WatchLaterIcon />
          </span>
        ) : (
          <span
            className="notaddedWishList"
            onClick={() => wishlistHandler(videoItem)}
          >
            <WatchLaterIcon />
          </span>
        )}
      </div>

      <div
        className="part-two"
        onClick={() => pageNavHandler(videoItem._id, videoItem.category)}
      >
        <div>
          <img src={avatar} alt={"user avatar"} className="imgCover" />
        </div>

        <div className="videoList_part-two-info">
          <p className="video_title">{videoItem.title}</p>
          <p className="video_categy">{videoItem.category}</p>
          <p>
            {videoItem.views} views | {videoItem.creator}
          </p>
        </div>
      </div>
    </li>
  );
};

export default VideoCard;
