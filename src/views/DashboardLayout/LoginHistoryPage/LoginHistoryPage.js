import React, {useContext} from "react";
import {Typography, Table} from "antd";
import {LoginHistoryContext} from "../../../shared/context";
import Bowser from "bowser";
import dayjs from "dayjs";
import {BrowserInfo, OsInfo} from "./userAgentInfo";
import {useTranslation} from "../../../shared/i18n";
import ApiDataLoader from "../../../shared/ApiDataLoader";

export const LoginHistoryPage = () => {
  const {t} = useTranslation();
  return (
    <div>
      <Typography.Title level={2}>{t("dashboard.apiLoginHistory")}</Typography.Title>

      <ApiDataLoader endpoint="/history/api" context={LoginHistoryContext}>
        <LoginHistoryTable />
      </ApiDataLoader>
    </div>
  )
}

export const LoginHistoryTable = () => {
  const {data} = useContext(LoginHistoryContext);
  const {t} = useTranslation();

  const tableColumns = [
    {title: t("timestamp"), dataIndex: "timestamp", key: "timestamp"},
    {title: t("ipAddress"), dataIndex: "ipAddress", key: "ipAddress"},
    {title: t("browser"), dataIndex: "browser", key: "browser"},
    {title: t("operatingSystem"), dataIndex: "os", key: "os"}
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={data.entries.map((data, key) => {
        const browser = Bowser.getParser(data.userAgent);

        return ({
          key,
          timestamp: dayjs(data.timestamp).format(t("fullDateFormat")),
          ipAddress: data.ipAddress,
          browser: (<BrowserInfo browser={browser} />),
          os: (<OsInfo browser={browser} />)
        });
      })}
      pagination={{
        pageSize: 10,
        showSizeChanger: false
      }}
      locale={{ emptyText: t("noData") }}
    >
    </Table>
  );
}

