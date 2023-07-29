import { categories, userData, videos } from "../contants";
import { v4 as uuid } from "uuid";

export const initialState = {
  isOpenPlayListAddModal: false,
  isPlayListDropBoxOpen: false,
  isNoteModalOpen: false,
  editNotes: false,
  videoNotes: {},
  comments: "",
  playListVideo: "",
  videoLibraryDB: JSON.parse(localStorage.getItem("videoLibraryDB")) || {
    categories: categories,
    videoList: videos,
  },
  userData: JSON.parse(localStorage.getItem("userData")) || userData,
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "AddToWishlist": {
      return {
        ...state,
        userData: {
          ...state.userData,
          wishlistData: [...state.userData.wishlistData, action.payload],
        },
      };
    }

    case "RemoveFromWishlist": {
      return {
        ...state,
        userData: {
          ...state.userData,
          wishlistData: [...state.userData.wishlistData].filter(
            (item) => item._id !== Number(action.payload)
          ),
        },
      };
    }

    case "RemovePlayListItem": {
      return {
        ...state,
        userData: {
          ...state.userData,
          playlistData: [...state.userData.playlistData].map((item) => {
            return item._id === action.payload.playlistId
              ? {
                  ...item,
                  listItem: [...item.listItem].filter(
                    (element) => element._id !== action.payload.videoId
                  ),
                }
              : { ...item };
          }),
        },
      };
    }

    case "OpenPlayListAddModal": {
      return {
        ...state,
        isOpenPlayListAddModal: true,
        isPlayListDropBoxOpen: false,
      };
    }

    case "OpenPlayListDropBoxOpen": {
      return {
        ...state,
        isPlayListDropBoxOpen: true,

        playListVideo: action.payload,
      };
    }

    case "ClosePlayListDropBoxOpen": {
      return {
        ...state,
        isPlayListDropBoxOpen: false,
      };
    }

    case "ClosePlayListAddModal": {
      return {
        ...state,
        isOpenPlayListAddModal: false,
      };
    }

    case "CreateNewPlayList": {
      return {
        ...state,
        userData: {
          ...state.userData,
          playlistData: [
            ...state.userData.playlistData,
            { ...action.payload, _id: uuid() },
          ],
        },
        isOpenPlayListAddModal: false,
      };
    }

    case "addToExsitingPlaylist": {
      return {
        ...state,
        userData: {
          ...state.userData,
          playlistData: [...state.userData.playlistData].map((item) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  listItem: item.listItem.some(
                    (elm) => elm._id === action.payload.video._id
                  )
                    ? [...item.listItem]
                    : [...item.listItem, action.payload.video],
                }
              : item
          ),
        },
        isOpenPlayListAddModal: false,
        isPlayListDropBoxOpen: false,
      };
    }

    case "DeletePlayList": {
      return {
        ...state,
        userData: {
          ...state.userData,
          playlistData: [...state.userData.playlistData].filter(
            (item) => item._id !== action.payload
          ),
        },
        isOpenPlayListAddModal: false,
      };
    }

    case "OpenNotesModal": {
      return {
        ...state,
        isNoteModalOpen: true,
        videoNotes: action.payload,
        editNotes: false,
      };
    }

    case "OpenNotesModalEdit": {
      return {
        ...state,
        isNoteModalOpen: true,
        videoNotes: action.payload.videoNotes,
        comments: action.payload.commentId,
        editNotes: true,
      };
    }

    case "CloseNotesModal": {
      return {
        ...state,
        isNoteModalOpen: false,
      };
    }

    case "AddNotes": {
      return {
        ...state,
        isNoteModalOpen: false,
        videoLibraryDB: {
          ...state.videoLibraryDB,
          videoList: [...state.videoLibraryDB.videoList]?.map((videoItem) => {
            return videoItem._id === state?.videoNotes?._id
              ? {
                  ...videoItem,
                  commentList: videoItem?.commentList
                    ? [
                        ...videoItem?.commentList,
                        { comment: action.payload, _id: uuid() },
                      ]
                    : [{ comment: action.payload, _id: uuid() }],
                }
              : videoItem;
          }),
        },
      };
    }

    case "EditedNoteUpdate": {
      return {
        ...state,
        isNoteModalOpen: false,
        editNotes: false,
        videoLibraryDB: {
          ...state.videoLibraryDB,
          videoList: [...state.videoLibraryDB.videoList]?.map((videoItem) => {
            return videoItem._id === action.payload.videoId
              ? {
                  ...videoItem,
                  commentList: videoItem?.commentList.map((commentItem) =>
                    commentItem._id === action.payload.commentId
                      ? { ...commentItem, comment: action.payload.notes }
                      : commentItem
                  ),
                }
              : videoItem;
          }),
        },
      };
    }

    case "DeleteNote": {
      return {
        ...state,
        videoLibraryDB: {
          ...state.videoLibraryDB,
          videoList: [...state.videoLibraryDB.videoList]?.map((videoItem) => {
            return videoItem._id === action.payload.videoId
              ? {
                  ...videoItem,
                  commentList: [...videoItem?.commentList].filter(
                    (commentItem) =>
                      commentItem._id !== action.payload.commentId
                  ),
                }
              : videoItem;
          }),
        },
      };
    }

    case "CloseModal": {
      return {
        ...state,
        isOpenPlayListAddModal: false,
        isPlayListDropBoxOpen: false,
        isNoteModalOpen: false,
        editNotes: false,
      };
    }

    default:
      return state;
  }
};
