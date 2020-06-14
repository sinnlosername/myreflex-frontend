import React, {useContext, useState} from "react";
import {Button, Typography, Table, Form, Input, Modal} from "antd";
import {ApiDataLoader, callApi} from "../../../shared/api";
import {WhitelistContext} from "../../../shared/context";
import ipRegex from "ip-regex";
import cls from './WhitelistPage.module.less';
import {IpInfoLoader} from "../IpInfo/IpInfo";

const {Title, Text} = Typography;

export const WhitelistPage = () => {
  return (
    <div>
      <Title level={2}>IP Whitelist</Title>
      <Text>
        In this panel you can manage what IP addresses can be used to run your Reflex copy.
        This way you can prevent your copy from being compromised. Make sure IPs of all
        your servers where you can use Reflex are here.
      </Text>
      <br/><br/>

      <ApiDataLoader endpoint="/whitelist/ips" context={WhitelistContext}>
        <WhitelistTable/>
      </ApiDataLoader>
    </div>
  )
}

const WhitelistAdd = ({form}) => {
  return (
    <Form form={form} name="login" layout="inline">
      <Form.Item
        name="ip"
        className={cls.addFormItem}
        rules={[
          {required: true, message: 'This field is required'},
          {pattern: ipRegex.v4({exact: true}), message: 'The value must be a valid ip address'}
        ]}>
        <Input placeholder="IP address" size="large"/>
      </Form.Item>
    </Form>
  );
}

const tableColumns = [
  {title: "IP", dataIndex: "ip", key: "ip"}
];
const WhitelistTable = () => {
  const {data, reloadData} = useContext(WhitelistContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addForm] = Form.useForm();

  function doAdd() {
    Modal.confirm({
      title: "Add new ip address",
      content: (<WhitelistAdd form={addForm}/>),
      icon: null,
      okText: "Add",
      okButtonProps: {size: "large"},
      cancelText: "Cancel",
      cancelButtonProps: {size: "large"},
      onOk: () => addForm.validateFields()
        .then(fields => callApi("POST", "/whitelist/ips/" + fields.ip, {}))
        .then(() => reloadData())
    });
  }

  function doDelete() {
    Modal.confirm({
      title: `Are you sure you want to delete ${selectedRowKeys.length} entries?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => callApi("PATCH", "/whitelist/ips", {
        remove: selectedRowKeys.map(key => data.entries[key])
      }).then(() => reloadData())
    });
  }

  return (
    <>
      <div className={cls.tableButtonRow}>
        <Button type="primary" size="large" onClick={doAdd}>
          Add
        </Button>
        <Button type="primary" size="large" onClick={doDelete} disabled={selectedRowKeys.length === 0}>
          Delete
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

