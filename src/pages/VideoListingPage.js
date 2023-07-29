import React from "react";
import { useParams } from "react-router";
import { useData } from "../context/DataContext";

import VideoCard from "../components/VideoCard";

const VideoListingPage = () => {
  const { categoryId } = useParams();

  const {
    state: { videoLibraryDB },
  } = useData();

  const videoListByCategory = videoLibraryDB.videoList.filter(
    (item) => item.category === categoryId
  );

  return (
    <article className="home_container flex-column">
      <h3 className="home_container-title">{categoryId}</h3>
      {videoListByCategory?.length > 0 ? (
        <ul className="videoLists">
          {videoListByCategory?.map((videoItem) => (
            <VideoCard key={videoItem._id} videoItem={videoItem} />
          ))}
        </ul>
      ) : (
        <>No Videos available</>
      )}
    </article>
  );
};

export default VideoListingPage;
