import React, { useState } from "react";
import { useData } from "../context/DataContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const AddPlayListDropBox = () => {
  const {
    dispatch,
    state: {
      userData: { playlistData },
      playListVideo,
    },
  } = useData();

  console.log(playListVideo);

  const closeModalHandler = () => {
    dispatch({
      type: "ClosePlayListDropBoxOpen",
    });
  };

  const createNewPlayListHandler = () => {
    dispatch({
      type: "OpenPlayListAddModal",
    });
  };

  const addToExsitingPlaylistHandler = (playlistId) => {
    dispatch({
      type: "addToExsitingPlaylist",
      payload: { playlistId: playlistId, video: playListVideo },
    });
  };

  return (
    <section className="modal_section addplaylistModal">
      <div className="modal_container flex-column">
        <div className="modal_container-header">
          <span className="title">Add to PlayList</span>
          <span onClick={closeModalHandler} className="closeModal">
            <HighlightOffIcon />
          </span>
        </div>

        <div className="addNewPlayListBtn">
          <button
            className="btn playListBtnCreate"
            onClick={createNewPlayListHandler}
          >
            Create New PlayList
          </button>
        </div>

        <div className="exisiting_playList_container">
          <h4>Add to Exsiting Playlist</h4>
          <ul>
            {playlistData?.map((playlistItem) => (
              <li
                key={playlistItem._id}
                onClick={() => addToExsitingPlaylistHandler(playlistItem._id)}
              >
                <span>{playlistItem.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AddPlayListDropBox;
