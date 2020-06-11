import React from "react";
import classes from './DashboardLayout.module.less';
import {Layout, Row, Col, Typography, Dropdown, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Footer} from "./Footer";

export const DashboardLayout = ({children}) => {
  return (
    <Layout className={classes.outerLayout} >
      <Layout.Header className={classes.header}>
        <HeaderRow/>
      </Layout.Header>

      <Layout>
        <Layout.Sider width={200} className={classes.sider}>
          Sider
        </Layout.Sider>

        <Layout.Content className={classes.content}>
          {children}
        </Layout.Content>
      </Layout>

      <Footer/>
    </Layout>
  );
};

const HeaderMenu = () => (
  <Menu>
    <Menu.Item key="logout">
      Logout
    </Menu.Item>
  </Menu>
);

const HeaderRow = () => (
  <Row align="middle" className={classes.headerRow}>
    <Col span={18} className={classes.headerTitleCol}>
      <Typography.Link className={classes.headerTitle} href="https://g.reflex.rip/spigot" target="_blank">Reflex</Typography.Link>
    </Col>
    <Col span={6} className={classes.headerMenuCol}>
      <Dropdown.Button overlay={<HeaderMenu/>} placement="bottomCenter" icon={<FontAwesomeIcon icon="user" />}>
        Logged in as Name (12345)
      </Dropdown.Button>
    </Col>
  </Row>
);