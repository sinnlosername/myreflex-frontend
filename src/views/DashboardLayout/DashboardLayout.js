import React, {useContext, useState} from "react";
import classes from './DashboardLayout.module.less';
import {Spin, Layout, Row, Col, Typography, Dropdown, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Footer} from "../Footer/Footer";
import {callApi} from "../../shared/api";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {UserContext, WhitelistStatusContext} from "../../shared/context";
import {WhitelistPage} from "./WhitelistPage/WhitelistPage";
import {LoginHistoryPage} from "./LoginHistoryPage/LoginHistoryPage";
import {StartupHistoryPage} from "./StartupHistoryPage/StartupHistoryPage";
import {faKey, faListAlt, faListUl, faThList, faUser} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "../../shared/i18n";
import {WhitelistSwitch} from "./WhitelistSwitch/WhitelistSwitch";
import ApiDataLoader from "../../shared/ApiDataLoader";
import {PasswordPage} from "./PasswordPage/PasswordPage";

export const DashboardLayout = () => {
  return (
    <ApiDataLoader endpoint="/auth/me" context={UserContext}>
      <ApiDataLoader endpoint="/whitelist" context={WhitelistStatusContext}>
        <Layout className={classes.outerLayout}>
          <Layout.Header className={classes.header}>
            <HeaderRow/>
          </Layout.Header>

          <Layout>
            <Layout.Sider width={275} className={classes.sider}>
              <SiderMenu/>
            </Layout.Sider>

            <Layout.Content className={classes.content}>
              <Switch>
                <Route path="/a/home" component={WhitelistPage}/>
                <Route path="/a/startup-history" component={StartupHistoryPage}/>
                <Route path="/a/login-history" component={LoginHistoryPage}/>
                <Route path="/a/password" component={PasswordPage}/>

                <Redirect to="/a/home"/>
              </Switch>
            </Layout.Content>
          </Layout>
          <Footer/>
        </Layout>
      </ApiDataLoader>
    </ApiDataLoader>
  );
};

const SiderMenu = () => {
  const {t} = useTranslation();
  const location = useLocation();
  const history = useHistory();

  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]} onSelect={entry => history.push(entry.key)}>
      <Menu.Item key="/a/home" icon={<FontAwesomeIcon icon={faListAlt}/>}>
        &nbsp;{t("dashboard.ipWhitelist")}<WhitelistSwitch/>
      </Menu.Item>
      <Menu.Item key="/a/startup-history"
                 icon={<FontAwesomeIcon icon={faThList}/>}>&nbsp;{t("dashboard.reflexStartupHistory")}</Menu.Item>
      <Menu.Item key="/a/login-history"
                 icon={<FontAwesomeIcon icon={faListUl}/>}>&nbsp;{t("dashboard.apiLoginHistory")}</Menu.Item>
      <Menu.Item key="/a/password"
                 icon={<FontAwesomeIcon icon={faKey}/>}>&nbsp;{t("dashboard.changeApiPassword")}</Menu.Item>
    </Menu>
  );
}

const HeaderMenu = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const [spinning, setSpinning] = useState(false);

  return (
    <Spin spinning={spinning}>
      <Menu>
        <Menu.Item key="logout" onClick={() => {
          callApi("DELETE", "/auth/me", {}, setSpinning, t)
            .then(() => history.push("../login"))
        }}>
          {t("logout")}
        </Menu.Item>
      </Menu>
    </Spin>
  );
}

const HeaderRow = () => {
  const {t} = useTranslation();
  const {data: user} = useContext(UserContext);

  return (
    <Row align="middle" className={classes.headerRow}>
      <Col span={18} className={classes.headerTitleCol}>
        <Typography.Link className={classes.headerTitle} href="https://g.reflex.rip/spigot"
                         target="_blank">{t("reflex")}</Typography.Link>
      </Col>
      <Col span={6} className={classes.headerMenuCol}>
        <Dropdown.Button overlay={<HeaderMenu/>} placement="bottomCenter" icon={<FontAwesomeIcon icon={faUser}/>}>
          {t("dashboard.loggedInAs", user.username, user["userID"])}
        </Dropdown.Button>
      </Col>
    </Row>
  );
}