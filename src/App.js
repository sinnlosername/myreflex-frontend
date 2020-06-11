import React from 'react';
import './App.less';

import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import {LoginLayout} from "./layouts/LoginLayout";
import {DashboardLayout} from "./layouts/DashboardLayout";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginLayout}/>
      <Route path="/a">
        <DashboardLayout>
          <Switch>
            <Route path="/a/home" render={() => (<p>home</p>)} />
            <Redirect to="/a/home" />
          </Switch>
        </DashboardLayout>
      </Route>
      <Redirect to="/a" />
    </Switch>
  </BrowserRouter>
);

export default App;