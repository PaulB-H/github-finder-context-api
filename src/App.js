import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Set alert
  const showAlert = (msg, type) => {
    // Same as { msg: msg, type: type }
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                // exact
                path="/github-finder-func-comp"
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              {/* When you pass in a component to a route like below you cannot pass in props */}
              <Route exact path="/about" component={About} />
              <Route exact path="/users/:login" component={user} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
