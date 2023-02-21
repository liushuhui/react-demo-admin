import { Button, Form, Input, InputNumber, Table, message } from 'antd';
import { addData, getAll, tableExport } from '../api';
import { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';

const FormSubmit = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any): Promise<any> => {
    const { code } = await addData(values);
    code === 200 ? getData() : message.error('error');
  };
  const getData = async (params = {}, sorter?: any) => {
    console.log('params', params, sorter);
    const sortParams = {
      sorter
    }
    const req = { ...params, ...sortParams }
    const result: any = await getAll(req);
    return {
      data: result.data,
      total: result.count,
      success: true,
    };
  };
  const colums: any[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: true
    },
    {
      title: '爱好',
      dataIndex: 'skill',
      key: 'skill',
      align: 'center'
    }
  ];
  const exportTable = async () => {
    const res = await tableExport()
    const content: any = res;
    const elink = document.createElement('a');
    elink.download = 'dataRecordlist.xls'; 
    elink.style.display = 'none';
    const blob = new Blob([content]);
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
  }
  useEffect(() => {
    getData({ pageSize: 5, current: 1 });
  }, []);
  return (
    <div style={{ display: 'flex', marginTop: '20px' }}>
      <ProTable
        style={{ width: '80vw', marginRight: '40px' }}
        rowKey="id"
        request={getData}
        columns={colums}
        options={false}
        bordered
        pagination={{
          defaultPageSize: 5,
          defaultCurrent: 1,
          showQuickJumper: true,
          showSizeChanger: true
        }}
        toolBarRender={() => [
          <Button type='primary' key="export" onClick={() => exportTable()}>导出</Button>,
          <Button type='primary' danger key="import">导入</Button>,
        ]}
      />
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber />
        </Form.Item>
        <Form.Item label="爱好" name="skill">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormSubmit;
