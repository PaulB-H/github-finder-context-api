import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <h3> Github Finder w/Context API </h3>
      <br />
      <h4>About this App</h4>
      <p>Made as part of "React - Front to Back" on Udemy.</p>
      <p>We built the project in three stages:</p>
      <ol>
        <li style={liStyle}>
          Class Components, with all actions & state within our main App.js,
          with props passed to components with "prop-drilling"
        </li>
        <li style={liStyle}>
          Re-factored to use Functional components with the useEffect hook
        </li>
        <li style={liStyle}>
          Re-factored to use the Context API. Moved all of our state and actions
          out of App.js and into a state file, used along with a context, and a
          reducer
        </li>
      </ol>
      <br />
      <hr />
      <br />
      <p>
        Find the course here:{" "}
        <a
          rel="noreferrer"
          href="https://www.udemy.com/course/modern-react-front-to-back/"
          target="_blank"
        >
          React - Front to Back
        </a>
      </p>
      <p>
        See the code here:{" "}
        <a
          rel="noreferrer"
          href="https://github.com/PaulB-H/github-finder-context-api"
          target="_blank"
        >
          Github Repo
        </a>
      </p>
      <p>
        Find me on{" "}
        <a
          rel="noreferrer"
          href="https://www.linkedin.com/in/paulb-h/"
          target="_blank"
        >
          LinkedIn
        </a>{" "}
        or checkout my{" "}
        <a rel="noreferrer" href="https://www.devbypaul.ca" target="_blank">
          Portfolio
        </a>
      </p>
    </Fragment>
  );
};

const liStyle = {
  marginLeft: "40px",
  maxWidth: "600px",
};

export default About;
