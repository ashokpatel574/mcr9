import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, DataReducer } from "../reducer/DataReducer";

const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  localStorage.setItem("videoLibraryDB", JSON.stringify(state.videoLibraryDB));
  localStorage.setItem("userData", JSON.stringify(state.userData));

  useEffect(() => {
    dispatch({ type: "CloseModal" });
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
export const useData = () => useContext(DataContext);
