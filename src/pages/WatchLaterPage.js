import React from "react";
import { useData } from "../context/DataContext";
import VideoCard from "../components/VideoCard";

const WatchLaterPage = () => {
  const {
    state: {
      userData: { wishlistData },
    },
  } = useData();

  return (
    <article className="home_container flex-column">
      <h3 className="home_container-title">WatchLater</h3>
      {wishlistData.length > 0 ? (
        <ul className="videoLists">
          {wishlistData?.map((videoItem) => (
            <VideoCard key={videoItem._id} videoItem={videoItem} />
          ))}
        </ul>
      ) : (
        <div> No Videos added to Watch Later List</div>
      )}
    </article>
  );
};

export default WatchLaterPage;
