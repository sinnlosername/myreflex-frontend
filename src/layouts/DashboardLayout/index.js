import React from "react";
import classes from './index.module.less';
import {Layout, Row, Col, Button} from "antd";

export const DashboardLayout = ({children}) => {
  return (
    <Layout className={classes.outerLayout} >
      <Layout.Header className={classes.header}>
        Header
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
        <BottomRow/>
      </Layout.Footer>
    </Layout>
  );
};

const BottomRow = () => {
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