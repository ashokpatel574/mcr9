import React from "react";
import { useData } from "../context/DataContext";
import { useParams } from "react-router";
import VideoCard from "../components/VideoCard";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PlayListsItemPage = () => {
  const { playlistId } = useParams();
  const {
    state: { userData },
    dispatch,
  } = useData();

  const playListData = userData.playlistData?.find(
    (item) => item._id === String(playlistId)
  );

  const removePlayListItemHandler = (vItemId, playlistId) => {
    dispatch({
      type: "RemovePlayListItem",
      payload: { videoId: vItemId, playlistId: playlistId },
    });
  };

  if (playListData) {
    return (
      <article className="home_container flex-column">
        <h3 className="home_container-title">{playListData?.title}</h3>
        <ul className="videoLists">
          {playListData.listItem.length > 0 ? (
            playListData.listItem?.map((videoItem) => (
              <div key={videoItem._id} className="playlistItem_container">
                <span
                  className="removeplayListItem flex-center"
                  onClick={() =>
                    removePlayListItemHandler(videoItem._id, playListData?._id)
                  }
                >
                  <HighlightOffIcon />
                </span>
                <VideoCard videoItem={videoItem} />
              </div>
            ))
          ) : (
            <div>No Playlist items Added </div>
          )}
        </ul>
      </article>
    );
  }
};

export default PlayListsItemPage;
