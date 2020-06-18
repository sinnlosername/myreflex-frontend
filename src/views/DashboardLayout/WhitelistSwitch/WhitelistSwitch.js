import {useTranslation} from "../../../shared/i18n";
import React, {useEffect, useState} from "react";
import {callApi} from "../../../shared/api";
import {Modal, Switch as AntSwitch} from "antd";
import cls from "./WhitelistSwitch.module.less";

export const WhitelistSwitch = () => {
  const {t} = useTranslation();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    callApi("GET", "/whitelist", undefined, setLoading).then(result => {
      if (result.error != null) {
        setError(result.error);
        return;
      }

      setChecked(result.data["information"] === "enabled");
      setLoading(false);
    })
  }, []);

  function handleChangeResult(result) {
    if (result.errorCode === "NOT_ALLOWED_TO_DISABLE_WHITELIST") {
      Modal.error({
        title: t("ipWhitelist.cannotDisable"),
        okText: t("okay")
      })
      return true;
    }

    if (result.error != null && !["ALREADY_ENABLED", "ALREADY_DISABLED"].includes(result.errorCode)) {
      setError(result);
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
                   });
               }}/>
  );
}
