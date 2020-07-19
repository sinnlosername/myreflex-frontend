import {Trans, useTranslation} from "../../../shared/i18n";
import React, {useContext, useState} from "react";
import {callApi} from "../../../shared/api";
import {Modal, Switch as AntSwitch} from "antd";
import cls from "./WhitelistSwitch.module.less";
import {WhitelistStatusContext} from "../../../shared/context";

export const WhitelistSwitch = () => {
  const {t} = useTranslation();
  const {data: {information}, reloadData} = useContext(WhitelistStatusContext);
  const [checked, setChecked] = useState(information?.toLowerCase() === "enabled");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChangeResult(result) {
    if (result.errorCode === "NOT_ALLOWED_TO_DISABLE_WHITELIST") {
      Modal.error({
        title: t("ipWhitelist.cannotDisable"),
        okText: t("okay")
      })
      return true;
    }

    if (result.error != null && !["ALREADY_ENABLED", "ALREADY_DISABLED"].includes(result.errorCode)) {
      setError(<Trans name={result.error} />);
    }
  }

  return error != null ? (<>{error}</>) : (
    <AntSwitch className={cls.whitelistSwitch} checked={checked} loading={loading}
               checkedChildren={t("enabled")} unCheckedChildren={t("disabled")} size={"small"}
               onChange={newChecked => {
                 callApi(newChecked ? "POST" : "DELETE", "/whitelist", {}, setLoading)
                   .then(handleChangeResult)
                   .then(checkedValue => {
                     setLoading(false);
                     setChecked(checkedValue ?? newChecked);
                     reloadData();
                   });
               }}
    />
  );
}
