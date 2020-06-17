import React, {useContext} from "react";
import {IpInfoContext} from "../../../shared/context";
import {Typography, Col, Row} from "antd";
import {ApiDataLoader} from "../../../shared/api";
import {useTranslation} from "../../../shared/i18n";

export const IpInfoLoader = ({endpoint}) => {
  return (
    <ApiDataLoader endpoint={endpoint} context={IpInfoContext}>
      <IpInfo/>
    </ApiDataLoader>
  )
}

export const IpInfo = () => {
  const {t} = useTranslation();
  const {data: info} = useContext(IpInfoContext);

  return (
    <Row>
      {info.message === "private range" ? (
        <Typography.Text>{t("ipInfo.unavailable")}</Typography.Text>
      ) : (
        <FullIpInfo info={info} />
      )}
    </Row>
  );
}

const FullIpInfo = ({info}) => {
  const {t} = useTranslation();
  return (
    <>
      <IpInfoCol name={t("country")} value={info["country"]}/>
      <IpInfoCol name={t("regionName")} value={info["regionName"]}/>
      <IpInfoCol name={t("city")} value={info["city"]}/>
      <IpInfoCol name={t("zip")} value={info["zip"]}/>

      <IpInfoCol name={t("isp")} value={info["isp"]}/>
      <IpInfoCol name={t("as")} value={info["as"]}/>

      <IpInfoCol name={t("org")} value={info["org"]}/>
    </>
  );
}

const IpInfoCol = ({name, value}) => (
  <>
    <Col span={8} md={4}><Typography.Text strong={true}>{name}</Typography.Text></Col>
    <Col span={16} md={8}>{value}</Col>
  </>
);