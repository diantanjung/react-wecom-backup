import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import Login from "./pages/Login"
import Register from './pages/Register';
import Home from './pages/Home';
import Run from './pages/Run';
import axiosInstance from "./helpers/axiosInstance";
import EditCode from "./pages/EditCode";
import Xterminal from "./pages/Xterminal";
import OpenFile from "./pages/OpenFile";
import OpenDir from "./pages/OpenDir";
import RunFile from "./pages/RunFile";
import Open from "./pages/Open";

export default function App() {

  const [username, setUsername] = useState('');

  useEffect(() => {
    (
      async () => {
        axiosInstance()
          .get("/user")
          .then((res) => {
            setUsername(res.data.username);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    )();
  }, []);

  // axiosInstance()
  // .get("/user")
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((err) => {
  //   console.log(err.message);
  // });

  return (
    <div>
      <Router>
        {/*<Nav username={username} />*/}
        <div>
          <Switch>
            <Route path="/" exact><Home username={username} /> </Route>
            <Route path="/@:username" component={Open}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/adduser"><Register username={username} /></Route>
            <Route path="/exe/:dir/:cmd" component={Run}></Route>
            <Route path="/editcode/:dir/:cmd" component={EditCode}></Route>
            <Route path="/xterminal/:dir/:cmd" component={Xterminal}></Route>
            {/*<Route path="/editfile" component={OpenFile}></Route>*/}
            {/*<Route path="/opendir" component={OpenDir}></Route>*/}
            <Route path="/run" component={RunFile}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}