import React from "react";
import {Typography, Col, Row} from "antd";
import {useTranslation} from "../../../shared/i18n";
import ApiDataLoader from "../../../shared/ApiDataLoader";

export const IpInfo = ({endpoint, ip}) => {
  return (
    <ApiDataLoader endpoint={`${endpoint}/${ip}`} inline prettyError>
      {({data}) => (
        <FullIpInfo info={data} />
      )}
    </ApiDataLoader>
  );
}

const FullIpInfo = ({info}) => {
  const {t} = useTranslation();
  return (
    <Row>
      <IpInfoCol name={t("org")} value={info["organization_name"]}/>
      <IpInfoCol name={t("as")} value={String(info["asn"])}/>
      <IpInfoCol name={t("country")} value={info["country"]}/>
      <IpInfoCol name={t("regionName")} value={info["region"]}/>
      <IpInfoCol name={t("city")} value={info["city"]}/>
    </Row>
  );
}

const IpInfoCol = ({name, value}) => value != null && value.length > 0 ? (
  <>
    <Col span={8} md={4}><Typography.Text strong={true}>{name}</Typography.Text></Col>
    <Col span={16} md={8}>{value}</Col>
  </>
) : (<></>);
