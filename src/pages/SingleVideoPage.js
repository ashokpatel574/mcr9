import React from "react";
import { useParams, useNavigate } from "react-router";
import { useData } from "../context/DataContext";
import avatar from "../assets/avatar/avatar-3.png";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SingleVideoPage = () => {
  const { categoryId, videoId } = useParams();
  const navigate = useNavigate();

  const {
    state: { videoLibraryDB, userData },
    dispatch,
  } = useData();

  const videoListData = videoLibraryDB.videoList.find(
    (item) => item._id === Number(videoId)
  );

  const inWishlist = userData.wishlistData?.some(
    (item) => item._id === Number(videoId)
  );

  const wishlistHandler = (video) => {
    inWishlist
      ? dispatch({ type: "RemoveFromWishlist", payload: video?._id })
      : dispatch({
          type: "AddToWishlist",
          payload: video,
        });
  };

  const moreVideoListDB = videoLibraryDB.videoList
    .filter((item) => item._id !== Number(videoId))
    .slice(0, 8);

  const addToPlayListhandler = (video) => {
    dispatch({ type: "OpenPlayListDropBoxOpen", payload: video });
  };

  const noteModalHandler = (video) => {
    dispatch({ type: "OpenNotesModal", payload: video });
  };

  const deleteNoteHandler = (commentId, videoId) => {
    dispatch({
      type: "DeleteNote",
      payload: {
        commentId: commentId,
        videoId: videoId,
      },
    });
  };

  const editNoteHandler = (commentId, video) => {
    dispatch({
      type: "OpenNotesModalEdit",
      payload: {
        commentId: commentId,
        videoNotes: video,
      },
    });
  };

  return videoListData ? (
    <article className="singlePage_container">
      <div className="singlePage-partOne">
        <div>
          <iframe
            width="700"
            height="350"
            src={videoListData.src}
            title={videoListData.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="partOne-info-header">
          <div>
            <div>
              <img className="avatarImg" src={avatar} alt={"user avatar"} />
            </div>

            <p>{videoListData.title}</p>
          </div>
          <div className="partOne-info-header-icons">
            {inWishlist ? (
              <span
                className="addedWishList-icon"
                onClick={() => wishlistHandler(videoListData)}
              >
                <WatchLaterIcon />
              </span>
            ) : (
              <span
                className="notaddedWishList-icon"
                onClick={() => wishlistHandler(videoListData)}
              >
                <WatchLaterIcon />
              </span>
            )}
            <span onClick={() => addToPlayListhandler(videoListData)}>
              <PlaylistAddIcon />
            </span>
            <span onClick={() => noteModalHandler(videoListData)}>
              <EditNoteIcon />
            </span>
          </div>
        </div>

        <div className="partOne-notes-container">
          <h3>My Notes</h3>
          <ul>
            {videoListData?.commentList?.map((commentItem) => (
              <li key={commentItem?._id} className="commentsListItem">
                <span className="comments">{commentItem.comment}</span>

                <span className="commets-icon">
                  <span
                    onClick={() =>
                      editNoteHandler(commentItem?._id, videoListData._id)
                    }
                  >
                    <EditIcon />
                  </span>
                  <span
                    onClick={() =>
                      deleteNoteHandler(commentItem?._id, videoListData._id)
                    }
                  >
                    <DeleteIcon />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="singlePage-partTwo">
        <h3>More Vidoes:</h3>
        <ul>
          {moreVideoListDB.length > 0 &&
            moreVideoListDB.map((item) => (
              <li key={item._id}>
                <div>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="imgCover"
                  />
                </div>
                <div>
                  <p>{item.title}</p>
                  <p>{item.creator}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </article>
  ) : (
    <></>
  );
};

export default SingleVideoPage;
