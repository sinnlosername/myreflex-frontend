import React, {useState} from "react";
import {Spin, Form, Col, Row, Typography, Input, Button} from "antd";

import cls from './LoginPage.module.less'
import {callApi} from "../api/api.js";

export const LoginPage = () => (
  <Row align={"middle"} className={cls.mainRow}>
    <Col span={14} className={cls.infoCol}>
      <Typography.Title level={3} className={cls.infoText}>
        Welcome! In this panel you can manage your Reflex account details, access, and more.
        If you have any questions please contact us in Discord.
      </Typography.Title>
    </Col>
    <Col span={10} className={cls.formCol}>
      <LoginForm />
    </Col>
  </Row>
);

const LoginForm = () => {
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState(null);

  function onResponse({error, data}) {
    if (error != null) {
      setError(error);
      return;
    }

    // todo redirect
  }

  return (
    <Spin spinning={spinning}>
      <Form name="login"
            onFinish={formData => callApi("POST", "/auth", {
              ...formData,
              cookie: true
            }, setSpinning).then(onResponse)}
            className={cls.form}>
        <Typography.Title level={2} className={cls.formTitle}>
          Sign In
        </Typography.Title>

        <Form.Item
          className={cls.formItem}
          name="username"
          rules={[{required: true, message: 'This field is required'}]}>
          <Input prefix={<></>} placeholder="Spigot username" size="large"/>
        </Form.Item>

        <Form.Item
          className={cls.formItem}
          name="password"
          rules={[{required: true, message: 'This field is required'}]}
          extra={"Don't use your spigot password for this!"}>
          <Input type="password" placeholder="API Password" size="large"/>
        </Form.Item>

        <FormError message={error} />

        <Form.Item>
          <Button type="primary" htmlType="submit" className={cls.submitButton} size={"large"} >
            LETS GO
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}

const FormError = ({message}) => (
  <div className={cls.formErrorWrapper}>
    {(message != null) && (
      <Typography.Text type="danger">{message}</Typography.Text>
    )}
  </div>
);