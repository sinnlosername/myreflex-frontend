import React, {useEffect, useState} from "react";
import {Spin, Typography, Col, Row} from "antd";
import {useTranslation} from "../../../shared/i18n";

export const IpInfo = ({ip}) => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://ip.nf/${ip}.json`)
      .then(resp => resp.json())
      .then(data => setInfo(data))
      .catch(error => setError(error))
  }, [ip]);

  return (
    <Spin spinning={info == null && error == null}>
      {error != null && error}
      {info != null && (<FullIpInfo info={info.ip} />)}
    </Spin>
  );
}

const FullIpInfo = ({info}) => {
  const {t} = useTranslation();
  return (
    <Row>
      {info["asn"].length === 0 && t("ipInfo.unavailable")}

      <IpInfoCol name={t("country")} value={info["country"]}/>
      <IpInfoCol name={t("city")} value={info["city"]}/>
      <IpInfoCol name={t("zip")} value={info["post_code"]}/>
      <IpInfoCol name={t("as")} value={info["asn"]}/>
      <IpInfoCol name={t("hostname")} value={info["hostname"].length > 0 ? info["hostname"].substr(0, info["hostname"].length - 1) : ""}/>
    </Row>
  );
}

const IpInfoCol = ({name, value}) => value != null && value.length > 0 ? (
  <>
    <Col span={8} md={4}><Typography.Text strong={true}>{name}</Typography.Text></Col>
    <Col span={16} md={8}>{value}</Col>
  </>
) : (<></>);
