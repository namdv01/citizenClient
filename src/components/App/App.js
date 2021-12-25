import React, { useState } from "react";
import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Menu from "../Menu/Menu";
import Landing from "../Layout/Landing";
import Login from "../Login/Login";
import ColorNavProvider from "../../contexts/ColorNav";
import Dashboard from "../Dashboard/Dashboard";
import Protect from "../Protect/Protect";
import Profile from "../Profile/Profile";
import Manage from "../Manage/Manage";
import Control from "../Control/Control";
import Analysis from "../Analysis/Analysis";

const App = () => {

  return (

    <Router>
      {/* <div>
        <Link to="/">landing</Link>
        <Link to="/login">form</Link>
      </div> */}
      <Switch>
        <ColorNavProvider>
          <Route path="/" exact component={Landing}>
            {/* <Landing /> */}
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Protect path="/dashboard" exact component={Dashboard} />
          <Protect path="/profile" exact component={Profile} />
          <Protect path="/manage" exact component={Manage} />
          <Protect path="/analysis" exact component={Analysis} />
          <Protect path="/control" exact component={Control} />

        </ColorNavProvider>
        {/* <Route path="/form" exact>
          <Form />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App;
