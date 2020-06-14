import React, {useContext} from "react";
import {Typography, Table} from "antd";
import {ApiDataLoader} from "../../../shared/api";
import {LoginHistoryContext} from "../../../shared/context";
import Bowser from "bowser";
import dayjs from "dayjs";
import {BrowserInfo, OsInfo} from "./userAgentInfo";

export const LoginHistoryPage = () => {
  return (
    <div>
      <Typography.Title level={2}>API login history</Typography.Title>

      <ApiDataLoader endpoint="/history/api" context={LoginHistoryContext}>
        <LoginHistoryTable />
      </ApiDataLoader>
    </div>
  )
}

const tableColumns = [
  {title: "Timestamp", dataIndex: "timestamp", key: "timestamp"},
  {title: "IP address", dataIndex: "ipAddress", key: "ipAddress"},
  {title: "Browser", dataIndex: "browser", key: "browser"},
  {title: "Operating System", dataIndex: "os", key: "os"}
];
export const LoginHistoryTable = () => {
  const {data} = useContext(LoginHistoryContext);

  return (
    <Table
      columns={tableColumns}
      dataSource={data.entries.map((data, key) => {
        const browser = Bowser.getParser(data.userAgent);

        return ({
          key,
          timestamp: dayjs(data.timestamp).format("DD.MM.YYYY HH:mm:ss"),
          ipAddress: data.ipAddress,
          browser: (<BrowserInfo browser={browser} />),
          os: (<OsInfo browser={browser} />)
        });
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: false
      }}
    >
    </Table>
  );
}

