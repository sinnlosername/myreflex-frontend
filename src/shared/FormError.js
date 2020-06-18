import cls from "../views/LoginLayout/LoginPage/LoginPage.module.less";
import {Typography} from "antd";
import React from "react";

export const FormError = ({message}) => (
  <div className={cls.formErrorWrapper}>
    {(message != null) && (
      <Typography.Text type="danger">{message}</Typography.Text>
    )}
  </div>
);