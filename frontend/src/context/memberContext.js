import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const MemberContext = createContext();

export const memberReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_DATA":
      return {
        members: [action.payload, ...state.members],
      };
    case "CREATE_SESSION":
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
        token: action.payload.token,
      };
    case "LOGIN_USER":
      return {
        ...state,
        loggedInUser: action.payload.member,
        token: action.payload.token,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        loggedInUser: null,
        token: null,
      };
    default:
      return state;
  }
};

export const MemberContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memberReducer, {
    members: [],
    loggedInUser: null,
    token: null,
    sessions: [], // Inisialisasi sessions sebagai array kosong
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      dispatch({
        type: "LOGIN_USER",
        payload: {
          member: storedUser.member,
          token: storedUser.token,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state.loggedInUser && state.token) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          member: state.loggedInUser,
          token: state.token,
        })
      );
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [state.loggedInUser, state.token]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    window.location.replace("/");
  };
  return (
    <MemberContext.Provider value={{ ...state, dispatch, handleLogout }}>
      {children}
    </MemberContext.Provider>
  );
};
