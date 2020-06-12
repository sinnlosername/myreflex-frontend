import React from "react";
import classes from './LoginLayout.module.less';

import {Layout, Typography} from "antd";
import {Footer} from "../Footer/Footer";
import {LoginPage} from "./LoginPage/LoginPage";

export const LoginLayout = () => {
  return (
    <Layout className={classes.outerLayout}>
      <Layout.Header className={classes.header}>
        <Typography.Link className={classes.headerTitle} href="https://g.reflex.rip/spigot" target="_blank">Reflex</Typography.Link>
      </Layout.Header>
      <Layout.Content className={classes.content}>
        <LoginPage/>
      </Layout.Content>
      <Footer/>
    </Layout>
  );
};