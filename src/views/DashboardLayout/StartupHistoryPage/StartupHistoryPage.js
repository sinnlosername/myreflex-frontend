import React, {useContext} from "react";
import {Table, Typography} from "antd";
import {ApiDataLoader} from "../../../shared/api";
import {LoginHistoryContext, StartupHistoryContext} from "../../../shared/context";
import dayjs from "dayjs";

export const StartupHistoryPage = () => {
  return (
    <div>
      <Typography.Title level={2}>Startup login history</Typography.Title>

      <ApiDataLoader endpoint="/history/startup" context={StartupHistoryContext}>
        <StartupHistoryTable/>
      </ApiDataLoader>
    </div>
  )
}

const tableColumns = [
  {title: "Timestamp", dataIndex: "timestamp", key: "timestamp"},
  {title: "IP address", dataIndex: "ipAddress", key: "ipAddress"}
];
export const StartupHistoryTable = () => {
  const {data} = useContext(LoginHistoryContext);

  return (
    <Table
      columns={tableColumns}
      dataSource={data.entries.map((data, key) => ({
        key,
        timestamp: dayjs(data.timestamp).format("DD.MM.YYYY HH:mm:ss"),
        ipAddress: data.ipAddress
      }))}
      pagination={{
        pageSize: 10,
        showSizeChanger: false
      }}>
    </Table>
  );
}


