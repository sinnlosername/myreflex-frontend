import React from 'react';
import './App.less';

import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import {LoginLayout} from "./views/LoginLayout/LoginLayout";
import {DashboardLayout} from "./views/DashboardLayout/DashboardLayout";

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