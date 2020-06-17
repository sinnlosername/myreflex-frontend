import React, {useState} from "react";
import {Spin, Form, Col, Row, Typography, Input, Button} from "antd";

import cls from './LoginPage.module.less'
import {callApi} from "../../../shared/api.js";
import {useHistory} from "react-router-dom";
import {useTranslation} from "../../../shared/i18n";

export const LoginPage = () => {
  const {t} = useTranslation();
  return (
    <Row align={"middle"} className={cls.mainRow}>
      <Col span={14} className={cls.infoCol}>
        <Typography.Title level={3} className={cls.infoText}>
          {t("login.helloText")}
        </Typography.Title>
      </Col>
      <Col span={10} className={cls.formCol}>
        <LoginForm/>
      </Col>
    </Row>
  );
}

const LoginForm = () => {
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const {t} = useTranslation();

  function onResponse({error, errorCode}) {
    if (error != null && errorCode !== "ALREADY_AUTHENTICATED") {
      setError(error);
      return;
    }

    history.push("/a/home");
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
          {t("signIn")}
        </Typography.Title>

        <Form.Item
          className={cls.formItem}
          name="username"
          rules={[{required: true, message: t("validation.fieldRequired")}]}>
          <Input placeholder={t("spigotUsername")} size="large" autoComplete="username"/>
        </Form.Item>

        <Form.Item
          className={cls.formItem}
          name="password"
          rules={[{required: true, message: t("validation.fieldRequired")}]}
          extra={t("login.notSpigotPass")}>
          <Input type="password" placeholder={t("apiPassword")} size="large" autoComplete="current-password"/>
        </Form.Item>

        <FormError message={error} />

        <Form.Item>
          <Button type="primary" htmlType="submit" className={cls.submitButton} size={"large"} >
            {t("login.doLogin")}
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