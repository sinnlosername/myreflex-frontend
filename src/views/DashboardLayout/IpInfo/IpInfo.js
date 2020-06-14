import React, {useContext} from "react";
import {IpInfoContext} from "../../../shared/context";
import {Typography, Col, Row} from "antd";
import {ApiDataLoader} from "../../../shared/api";

export const IpInfoLoader = ({endpoint}) => {
  return (
    <ApiDataLoader endpoint={endpoint} context={IpInfoContext}>
      <IpInfo/>
    </ApiDataLoader>
  )
}

export const IpInfo = () => {
  const {data: info} = useContext(IpInfoContext);

  return (
    <Row>
      {info.message === "private range" ? (
        <Typography.Text>There is no information available about this ip address.</Typography.Text>
      ) : (
        <FullIpInfo info={info} />
      )}
    </Row>
  );
}

const FullIpInfo = ({info}) => (
  <>
    <IpInfoCol name={"Country"} value={info["country"]}/>
    <IpInfoCol name={"Region"} value={info["regionName"]}/>
    <IpInfoCol name={"City"} value={info["city"]}/>
    <IpInfoCol name={"ZIP"} value={info["zip"]}/>

    <IpInfoCol name={"ISP"} value={info["isp"]}/>
    <IpInfoCol name={"AS"} value={info["as"]}/>

    <IpInfoCol name={"Organisation"} value={info["org"]}/>
  </>
)

const IpInfoCol = ({name, value}) => (
  <>
    <Col span={8} md={4}><Typography.Text strong={true}>{name}</Typography.Text></Col>
    <Col span={16} md={8}>{value}</Col>
  </>
);