import React, { useReducer, useEffect } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Load initial users
  useEffect(() => {
    setLoading();
    async function fetchData() {
      // You can await here
      const res = await axios.get(`https://api.github.com/users`, {
        headers: {
          "User-Agent": "PaulB-H",
          Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
        },
      });
      // setUsers(res.data);
      // setLoading(false);

      dispatch({
        type: SEARCH_USERS,
        payload: res.data,
      });
    }
    fetchData();
  }, []);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          "User-Agent": "PaulB-H",
          Authorization: "token " + process.env.REACT_APP_GITHUB_OATH_TOKEN,
        },
      }
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User

  // Get Repos

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
