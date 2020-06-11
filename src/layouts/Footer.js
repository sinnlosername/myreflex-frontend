import {Button, Col, Layout, Row} from "antd";
import classes from "./Footer.module.less";
import React from "react";

export const Footer = () => {
  return (
    <Layout.Footer className={classes.footer}>
      <Row>
        <Col span={6}>
          Left
        </Col>
        <Col span={12}>
          © {new Date().getFullYear()} - Reflex Developement Team (reflex.rip)
        </Col>
        <Col span={6}>
          <Button className={classes.footerDiscordLink} type="link" href="https://g.reflex.rip/discord"
                  target="_blank">Discord</Button>
        </Col>
      </Row>
    </Layout.Footer>
  )
}