import React from 'react';
import './App.less';

import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import {LoginLayout} from "./views/LoginLayout/LoginLayout";
import {DashboardLayout} from "./views/DashboardLayout/DashboardLayout";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faListAlt, faKey, faThList, faListUl } from "@fortawesome/free-solid-svg-icons";

[faUser, faListAlt, faKey, faThList, faListUl].forEach(icon => library.add(icon));

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginLayout}/>
      <Route path="/a" component={DashboardLayout} />
      <Redirect to="/a" />
    </Switch>
  </BrowserRouter>
);

export default App;