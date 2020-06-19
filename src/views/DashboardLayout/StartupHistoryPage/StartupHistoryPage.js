import React, {useContext} from "react";
import {Table, Typography} from "antd";
import {StartupHistoryContext} from "../../../shared/context";
import dayjs from "dayjs";
import {IpInfoLoader} from "../IpInfo/IpInfo";
import {useTranslation} from "../../../shared/i18n";
import ApiDataLoader from "../../../shared/ApiDataLoader";

export const StartupHistoryPage = () => {
  const {t} = useTranslation();
  return (
    <div>
      <Typography.Title level={2}>{t("dashboard.reflexStartupHistory")}</Typography.Title>

      <ApiDataLoader endpoint="/history/reflex" context={StartupHistoryContext}>
        <StartupHistoryTable/>
      </ApiDataLoader>
    </div>
  )
}


export const StartupHistoryTable = () => {
  const {t} = useTranslation();
  const {data} = useContext(StartupHistoryContext);
  const tableColumns = [
    {title: t("timestamp"), dataIndex: "timestamp", key: "timestamp"},
    {title: t("ipAddress"), dataIndex: "ipAddress", key: "ipAddress"}
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={data.entries.map((data, key) => ({
        key,
        timestamp: dayjs(data.timestamp).format(t("fullDateFormat")),
        ipAddress: data.ipAddress
      }))}
      pagination={{
        pageSize: 10,
        showSizeChanger: false
      }}
      expandable={{
        expandedRowRender: record => (<IpInfoLoader endpoint={`/history/reflex/${record.ipAddress}`} />)
      }}
      locale={{ emptyText: t("noData") }}
    >
    </Table>
  );
}