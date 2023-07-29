import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import VideoCard from "../components/VideoCard";

const ExplorePage = () => {
  const [filterVideoList, setFilterVideoList] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const {
    state: { videoLibraryDB },
  } = useData();

  const filterByTitleHandler = (e) => {
    setSearchInput(e.target.value);

    const filterList = videoLibraryDB.videoList.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
    );
    setFilterVideoList(filterList);
  };

  useEffect(() => {
    setFilterVideoList(videoLibraryDB?.videoList);
  }, []);

  return (
    <article className="explorePage_container">
      <h2>Explore</h2>

      <div className="explorePage-partOne">
        <label htmlFor="searchInput"></label>
        <input
          type="text"
          name="searchInput"
          id="searchInput"
          placeholder="Search video by title"
          value={searchInput}
          onChange={filterByTitleHandler}
        />
      </div>

      <ul className="videoLists">
        {filterVideoList?.map((videoItem) => (
          <VideoCard key={videoItem._id} videoItem={videoItem} />
        ))}
      </ul>
    </article>
  );
};

export default ExplorePage;
