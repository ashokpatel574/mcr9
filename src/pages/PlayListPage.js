import React from "react";
import { useData } from "../context/DataContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router";

const PlayListPage = () => {
  const {
    state: { userData },
    dispatch,
  } = useData();
  const navigate = useNavigate();

  const addplaylistHandler = () => {
    dispatch({
      type: "OpenPlayListAddModal",
    });
  };

  const deletePlayListItemHandler = (playlistId) => {
    dispatch({
      type: "DeletePlayList",
      payload: playlistId,
    });
  };

  const pageNavHandler = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <article className="home_container flex-column">
      <h3 className="home_container-title">Playlists</h3>
      <ul className=" playListPage_playLists">
        {userData.playlistData.map((playListItem) => (
          <li key={playListItem._id}>
            <div>
              <img
                src={playListItem.img}
                alt={playListItem.title}
                className="imgCover"
                onClick={() => pageNavHandler(playListItem._id)}
              />

              <span
                className="playList_delete-icon flex-center"
                onClick={() => deletePlayListItemHandler(playListItem._id)}
              >
                <HighlightOffIcon />
              </span>
            </div>
            <div onClick={() => pageNavHandler(playListItem._id)}>
              <p>{playListItem.title}</p>
              <p>{playListItem.details}</p>
            </div>
          </li>
        ))}

        <div className="addnewPlaylist">
          <span className="flex-center" onClick={addplaylistHandler}>
            <AddCircleOutlineIcon />
          </span>
        </div>
      </ul>
    </article>
  );
};

export default PlayListPage;
