import React from 'react';
import './App.less';

import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import {LoginLayout} from "./views/LoginLayout/LoginLayout";
import {DashboardLayout} from "./views/DashboardLayout/DashboardLayout";
import {TranslationLoader} from "./shared/i18n";

const App = () => (
  <TranslationLoader src="/languages.json">
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginLayout}/>
        <Route path="/a" component={DashboardLayout} />
        <Redirect to="/a" />
      </Switch>
    </BrowserRouter>
  </TranslationLoader>
);

export default App;