import React, {useContext, useState} from "react";
import {Button, Typography, Table, Form, Input, Modal} from "antd";
import {ApiDataLoader, callApi} from "../../../shared/api";
import {WhitelistContext} from "../../../shared/context";
import ipRegex from "ip-regex";
import cls from './WhitelistPage.module.less';
import {IpInfoLoader} from "../IpInfo/IpInfo";
import {Trans, useTranslation} from "../../../shared/i18n";

const {Title, Text} = Typography;

export const WhitelistPage = () => {
  return (
    <div>
      <Title level={2}>IP Whitelist</Title>#
      <Trans name="ipWhitelist.infoText" component={Text}/>
      <br/><br/>

      <ApiDataLoader endpoint="/whitelist/ips" context={WhitelistContext}>
        <WhitelistTable/>
      </ApiDataLoader>
    </div>
  )
}

const WhitelistAdd = ({form}) => {
  const {t} = useTranslation();

  return (
    <Form form={form} name="login" layout="inline">
      <Form.Item
        name="ip"
        className={cls.addFormItem}
        rules={[
          {required: true, message: t("validation.fieldRequired")},
          {pattern: ipRegex.v4({exact: true}), message: t("ipWhitelist.mustBeIp")}
        ]}>
        <Input placeholder={t("ipAddress")} size="large"/>
      </Form.Item>
    </Form>
  );
}


const WhitelistTable = () => {
  const {t, attach} = useTranslation();
  const {data, reloadData} = useContext(WhitelistContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addForm] = Form.useForm();

  const tableColumns = [
    {title: t("ipAddress"), dataIndex: "ip", key: "ip"}
  ];

  function doAdd() {
    Modal.confirm({
      title: t("ipWhitelist.addIpAddress"),
      content: attach(<WhitelistAdd form={addForm}/>),
      icon: null,
      okText: t("add"),
      okButtonProps: {size: "large"},
      cancelText: t("cancel"),
      cancelButtonProps: {size: "large"},
      onOk: () => addForm.validateFields()
        .then(fields => callApi("POST", "/whitelist/ips/" + fields.ip, {}))
        .then(() => reloadData())
    });
  }

  function doDelete() {
    Modal.confirm({
      title: t("ipWhitelist.sureDelete", selectedRowKeys.length),
      okText: t("delete"),
      okType: "danger",
      cancelText: t("cancel"),
      onOk: () => callApi("PATCH", "/whitelist/ips", {
        remove: selectedRowKeys.map(key => data.entries[key])
      }).then(() => reloadData())
    });
  }

  return (
    <>
      <div className={cls.tableButtonRow}>
        <Button type="primary" size="large" onClick={doAdd}>
          {t("add")}
        </Button>
        <Button type="primary" size="large" onClick={doDelete} disabled={selectedRowKeys.length === 0}>
          {t("delete")}
        </Button>
      </div>
      <Table columns={tableColumns}
             dataSource={data.entries.map((ip, key) => ({ip, key}))}
             pagination={{
               pageSize: 8,
               showSizeChanger: false
             }}
             rowSelection={{
               selectedRowKeys,
               onChange: setSelectedRowKeys
             }}
             expandable={{
               expandedRowRender: record => (<IpInfoLoader endpoint={`/whitelist/ips/${record.ip}`} />)
             }}
      />
    </>
  )
}
