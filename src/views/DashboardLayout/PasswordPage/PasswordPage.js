import React, {useState} from "react";
import {callApi} from "../../../shared/api";
import {Button, Form, Input, Typography, Modal, Spin} from "antd";
import {FormError} from "../../../shared/FormError";
import {Trans, useTranslation} from "../../../shared/i18n";
import cls from './PasswordPage.module.less';
import {useHistory} from "react-router-dom";
import {showPasswordIconRender} from "../../../shared/misc";

export const PasswordPage = () => {
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState(null);
  const {t} = useTranslation();
  const history = useHistory();

  function onResponse(result) {
    if (result.error != null) {
      setError(result.error);
      return;
    }

    Modal.info({
      title: t("passwordChange.success"),
      okText: t("okay"),
      onOk: () => history.push("../login")
    })
  }

  return (
    <Spin spinning={spinning}>
      <Form name="passwordChange"
            onFinish={formData => callApi("POST", "/auth/password", formData, setSpinning).then(onResponse)}
            className={cls.form}>
        <Typography.Title level={2}>
          {t("dashboard.changeApiPassword")}
        </Typography.Title>
        <Trans name="passwordChange.infoText" component={Typography.Text}/>
        <br/><br/>

        <Form.Item
          className={cls.formItem}
          name="oldPassword"
          rules={[{required: true, whitespace: true, message: t("validation.fieldRequired")}]}>
          <Input.Password type="password" placeholder={t("passwordChange.oldPassword")} size="large"
                          autoComplete="current-password" iconRender={showPasswordIconRender}/>
        </Form.Item>

        <Form.Item
          className={cls.formItem}
          name="newPassword"
          rules={[{required: true, whitespace: true, message: t("validation.fieldRequired")}]}>
          <Input.Password type="password" placeholder={t("passwordChange.newPassword")} size="large"
                          autoComplete="new-password" iconRender={showPasswordIconRender}/>
        </Form.Item>

        <FormError message={error} />

        <Form.Item>
          <Button type="primary" htmlType="submit" className={cls.submitButton} size={"large"} >
            {t("passwordChange.action")}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}