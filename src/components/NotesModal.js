import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const NotesModal = () => {
  const [notes, setNotes] = useState("");

  const {
    dispatch,
    state: {
      editNotes,
      comments,
      videoNotes,
      videoLibraryDB: { videoList },
    },
  } = useData();

  const notesInputHandler = (e) => {
    setNotes(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    editNotes
      ? dispatch({
          type: "EditedNoteUpdate",
          payload: { notes: notes, videoId: videoNotes, commentId: comments },
        })
      : dispatch({
          type: "AddNotes",
          payload: notes,
        });
  };

  const closeModalHandler = () => {
    dispatch({
      type: "CloseNotesModal",
    });

    setNotes("");
  };

  useEffect(() => {
    if (editNotes) {
      const commentData = videoList
        .find((item) => item._id === Number(videoNotes))
        ?.commentList.find((elem) => elem._id === comments).comment;

      setNotes(commentData);
    }
  }, [editNotes]);

  return (
    <section className="modal_section playlistModal">
      <div className="modal_container flex-column">
        <div className="modal_container-header">
          <span className="title">Note</span>
          <span onClick={closeModalHandler} className="closeModal">
            <HighlightOffIcon />
          </span>
        </div>
        <div className="modal_container-body ">
          <form className="form" value={notes} onSubmit={formSubmitHandler}>
            <div>
              <input
                id="addnote"
                className="addnote "
                type="text"
                placeholder="Add note here"
                name="addnote"
                value={notes}
                onChange={notesInputHandler}
              />
              <label htmlFor="addnote"></label>
            </div>

            <button type="submit" className="btn submitBtn">
              {editNotes ? "Update Note" : "Add Notes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NotesModal;
