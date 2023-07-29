import React, { useState } from "react";
import { useData } from "../context/DataContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const PlayListNewModal = () => {
  const [newPlayModaldata, setNewPlayModaldata] = useState({
    title: "",
    details: "",
  });

  const { dispatch } = useData();

  const newPlayListInputHandler = (e) => {
    const { name, value } = e.target;
    setNewPlayModaldata({ ...newPlayModaldata, [name]: value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const newplayListData = {
      img: "https://picsum.photos/300/174",
      title: newPlayModaldata.title,
      details: newPlayModaldata.details,
      listItem: [],
    };

    dispatch({
      type: "CreateNewPlayList",
      payload: { ...newplayListData },
    });
  };

  const closeModalHandler = () => {
    dispatch({
      type: "ClosePlayListAddModal",
    });

    setNewPlayModaldata({ title: "", details: "" });
  };

  return (
    <section className="modal_section playlistModal">
      <div className="modal_container flex-column">
        <div className="modal_container-header">
          <span className="title">Create New PlayList</span>
          <span onClick={closeModalHandler} className="closeModal">
            <HighlightOffIcon />
          </span>
        </div>
        <div className="modal_container-body ">
          <form
            className="form"
            value={newPlayModaldata}
            onSubmit={formSubmitHandler}
          >
            <div>
              <input
                id="newPlayModaldataTitle"
                className="newPlayModaldataTitle "
                type="text"
                placeholder="Add Playlist Title."
                name="title"
                value={newPlayModaldata.title}
                onChange={newPlayListInputHandler}
              />
              <label htmlFor="newPlayModaldataTitle "></label>
            </div>
            <div>
              <input
                id="newPlayModaldataDetails"
                className="newPlayModaldataDetails "
                type="text"
                placeholder="Add Playlist Details."
                name="details"
                value={newPlayModaldata.details}
                onChange={newPlayListInputHandler}
              />
              <label htmlFor="newPlayModaldataDetails"></label>
            </div>

            <button type="submit" className="btn submitBtn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PlayListNewModal;
