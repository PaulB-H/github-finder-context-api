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

let githubOathToken;

if (process.env.NODE_ENV !== "production") {
  githubOathToken = process.env.REACT_APP_GITHUB_OATH_TOKEN;
} else {
  githubOathToken = process.env.GITHUB_OATH_TOKEN;
}

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
      const res = await axios.get(`https://api.github.com/users`, {
        headers: {
          "User-Agent": "PaulB-H",
          Authorization: "token " + githubOathToken,
        },
      });

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
          Authorization: "token " + githubOathToken,
        },
      }
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get a single Github user
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        "User-Agent": "PaulB-H",
        Authorization: "token " + githubOathToken,
      },
    });

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get a user's repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          "User-Agent": "PaulB-H",
          Authorization: "token " + githubOathToken,
        },
      }
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

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
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
