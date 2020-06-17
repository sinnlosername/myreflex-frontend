import React from "react";
import classes from './LoginLayout.module.less';

import {Layout, Typography} from "antd";
import {Footer} from "../Footer/Footer";
import {LoginPage} from "./LoginPage/LoginPage";
import {useTranslation} from "../../shared/i18n";

export const LoginLayout = () => {
  const {t} = useTranslation();
  return (
    <Layout className={classes.outerLayout}>
      <Layout.Header className={classes.header}>
        <Typography.Link className={classes.headerTitle} href="https://g.reflex.rip/spigot" target="_blank">{t("reflex")}</Typography.Link>
      </Layout.Header>
      <Layout.Content className={classes.content}>
        <LoginPage/>
      </Layout.Content>
      <Footer/>
    </Layout>
  );
};