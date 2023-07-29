import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import PageNotFound from "./pages/PageNotFound";

import { useData } from "./context/DataContext";
import SideNavBar from "./components/SideNavBar";
import ExplorePage from "./pages/ExplorePage";
import VideoListingPage from "./pages/VideoListingPage";
import SingleVideoPage from "./pages/SingleVideoPage";
import PlayListPage from "./pages/PlayListPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import PlayListsItemPage from "./pages/PlayListsItemPage";
import PlayListNewModal from "./components/PlayListNewModal";
import NotesModal from "./components/NotesModal";
import AddPlayListDropBox from "./components/AddPlayListDropBox";

const App = () => {
  const {
    state: { isPlayListDropBoxOpen, isOpenPlayListAddModal, isNoteModalOpen },
    dispatch,
  } = useData();

  const closeModalOverlayHandler = (e) => {
    if (
      e.target.className === "modal_overlay" ||
      e.target.className === "modal_section"
    ) {
      dispatch({
        type: "CloseModal",
      });
    }
  };

  return (
    <main className="main ">
      <h2 className="title">Video Library</h2>
      <article className="videoLibrary_container ">
        <SideNavBar />
        <Routes>
          <Route path="/" element=<HomePage /> />
          <Route path="/explore" element=<ExplorePage /> />
          <Route path="/category/:categoryId" element=<VideoListingPage /> />
          <Route
            path="/category/:categoryId/:videoId"
            element=<SingleVideoPage />
          />

          <Route path="/playlist" element=<PlayListPage /> />
          <Route path="/playlist/:playlistId" element=<PlayListsItemPage /> />
          <Route path="/watchlater" element=<WatchLaterPage /> />

          <Route path="*" element=<PageNotFound /> />
        </Routes>
      </article>

      {isOpenPlayListAddModal && (
        <div className="modal_overlay" onClick={closeModalOverlayHandler}>
          <PlayListNewModal />
        </div>
      )}

      {isPlayListDropBoxOpen && (
        <div className="modal_overlay" onClick={closeModalOverlayHandler}>
          <AddPlayListDropBox />
        </div>
      )}

      {isNoteModalOpen && (
        <div className="modal_overlay" onClick={closeModalOverlayHandler}>
          <NotesModal />
        </div>
      )}
    </main>
  );
};

export default App;
