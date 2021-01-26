import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

// Added props via destructuring here
const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // We pull out what we want to call the piece of state and the method
  // we use to change the piece of state and then our default value
  const [text, setText] = useState("");

  // not a class anymore so we add const before it
  const onSubmit = (e) => {
    e.preventDefault();
    // this.state.text => text
    if (text === "") {
      // this.props.setAlert => setAlert & added to props via destructuring
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      // this.setState({ text: "" }); => setText('');
      setText("");
    }
  };

  // We no longer do this.setState, we call setText
  // we no longer have to pass in an object { [e.target.name]: e.target.value }
  // Just need the value we want to set it to
  const onChange = (e) => setText(e.target.value);

  // No more render we need a return
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          // this.state.text/onChange => text, onChange
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
