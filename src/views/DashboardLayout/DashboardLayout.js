import React, {useContext, useState} from "react";
import classes from './DashboardLayout.module.less';
import {Spin, Layout, Row, Col, Typography, Dropdown, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Footer} from "../Footer/Footer";
import {callApi, ApiDataLoader} from "../../shared/api";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {UserContext} from "../../shared/context";

export const DashboardLayout = ({children}) => {
  return (
    <ApiDataLoader endpoint="/auth/me" context={UserContext}>
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
              <Route path="/a/home" render={() => (<p>home1</p>)} />
              <Route path="/a/startup-history" render={() => (<p>home2</p>)} />
              <Route path="/a/login-history" render={() => (<p>home3</p>)} />
              <Route path="/a/password" render={() => (<p>home4</p>)} />

              <Redirect to="/a/home" />
            </Switch>
          </Layout.Content>
        </Layout>
        <Footer/>
      </Layout>
    </ApiDataLoader>
  );
};

const SiderMenu = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Menu mode="inline" defaultSelectedKeys={[location.pathname]} onSelect={entry => history.push(entry.key)}>
      <Menu.Item key="/a/home" icon={<FontAwesomeIcon icon="list-alt" />}>&nbsp;IP Whitelist</Menu.Item>
      <Menu.Item key="/a/startup-history" icon={<FontAwesomeIcon icon="th-list" />}>&nbsp;Reflex startup history</Menu.Item>
      <Menu.Item key="/a/login-history" icon={<FontAwesomeIcon icon="list-ul" />}>&nbsp;API login history</Menu.Item>
      <Menu.Item key="/a/password" icon={<FontAwesomeIcon icon="key" />}>&nbsp;Change API password</Menu.Item>
    </Menu>
  );
}

const HeaderMenu = () => {
  const history = useHistory();
  const [spinning, setSpinning] = useState(false);

  return (
    <Spin spinning={spinning}>
      <Menu>
        <Menu.Item key="logout" onClick={() => {
          callApi("DELETE", "/auth/me", {}, setSpinning)
            .then(() => history.push("../login"))
        }}>
          Logout
        </Menu.Item>
      </Menu>
    </Spin>
  );
}

const HeaderRow = () => {
  const user = useContext(UserContext);

  return (
    <Row align="middle" className={classes.headerRow}>
      <Col span={18} className={classes.headerTitleCol}>
        <Typography.Link className={classes.headerTitle} href="https://g.reflex.rip/spigot"
                         target="_blank">Reflex</Typography.Link>
      </Col>
      <Col span={6} className={classes.headerMenuCol}>
        <Dropdown.Button overlay={<HeaderMenu/>} placement="bottomCenter" icon={<FontAwesomeIcon icon="user"/>}>
          Logged in as {user.username} ({user["userID"]})
        </Dropdown.Button>
      </Col>
    </Row>
  );
}