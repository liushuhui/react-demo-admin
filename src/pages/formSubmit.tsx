import { Button, Form, Input, InputNumber, Table, message } from 'antd';
import { addData, getAll } from '../api';
import { useEffect, useState } from 'react';
import { ProTable } from '@ant-design/pro-components';

const FormSubmit = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>([]);
  const onFinish = async (values: any): Promise<any> => {
    const { code } = await addData(values);
    code === 200 ? getData() : message.error('error');
  };
  const getData = async () => {
    const result: any = await getAll({ pageSize: 5, current: 1 });
    console.log(result);
    setTableData(result?.data);
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
      align: 'center'
    },
    {
      title: '爱好',
      dataIndex: 'skill',
      key: 'skill',
      align: 'center'
    }
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <ProTable
        rowKey="id"
        dataSource={tableData}
        columns={colums}
        style={{ width: '50vw' }}
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
