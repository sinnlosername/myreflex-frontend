import React, {useEffect} from 'react';
import './App.less';
import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import {LoginLayout} from "./views/LoginLayout/LoginLayout";
import {DashboardLayout} from "./views/DashboardLayout/DashboardLayout";
import {TranslationLoader} from "./shared/i18n";
import {Modal} from "antd";

const App = () => {
  useEffect(() => {
    document.addEventListener("keydown", ev => {
      if (!ev.ctrlKey || ev.key.toLowerCase() !== "g") return; // CTRL + G

      Modal.info({
        content: (<img src="https://blob.sx/O8O1.gif" alt="okay?" />), // Don't ask
        icon: null,
        okText: "Okay?",
        width: 570
      })
    })
  }, []);

  return (
    <TranslationLoader src="/languages.json">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginLayout}/>
          <Route path="/a" component={DashboardLayout}/>
          <Redirect to="/a"/>
        </Switch>
      </BrowserRouter>
    </TranslationLoader>
  );
};

export default App;