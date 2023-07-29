import React from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    state: { videoLibraryDB },
  } = useData();

  return (
    <article className="home_container flex-column">
      <h3 className="home_container-title">Category</h3>
      <ul className="categoryLists">
        {videoLibraryDB.categories?.map((catgItem) => (
          <Link key={catgItem._id} to={`/category/${catgItem.category}`}>
            <li>
              <div className="categoryHeader_container flex-center">
                <img
                  src={catgItem.thumbnail}
                  alt={catgItem.category}
                  className="imgCover"
                />
              </div>

              <p>{catgItem.category}</p>
            </li>
          </Link>
        ))}
      </ul>
    </article>
  );
};

export default HomePage;
