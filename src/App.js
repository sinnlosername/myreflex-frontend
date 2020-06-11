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
            <Route path="/a/test" render={() => (<p>test1</p>)} />
            <Route path="/a/test2" render={() => (<p>test2</p>)} />
            <Redirect to="/a/test" />
          </Switch>
        </DashboardLayout>
      </Route>
      <Redirect to="/a" />
    </Switch>
  </BrowserRouter>
);

export default App;