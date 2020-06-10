import React from "react";
import classes from './index.module.less';
import {Layout, Row, Col, Button, Typography, Dropdown, Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

      <Layout.Footer className={classes.footer}>
        <FooterRow/>
      </Layout.Footer>
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

const FooterRow = () => {
  return (
    <Row>
      <Col span={6}>
        Left
      </Col>
      <Col span={12}>
        © {new Date().getFullYear()} - Reflex Developement Team (reflex.rip)
      </Col>
      <Col span={6}>
        <Button className={classes.footerDiscordLink} type="link" href="https://g.reflex.rip/discord" target="_blank">Discord</Button>
      </Col>
    </Row>
  )
}