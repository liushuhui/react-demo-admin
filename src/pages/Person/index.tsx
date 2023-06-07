import { Button, Image, Modal, Space, Tag, Upload, UploadProps, message } from 'antd';
import { deleteByIdApi, getAll, getCodeApi, tableExport } from '../../api';
import { useRef, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import AddForm from '../components/AddForm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMount } from 'ahooks';
import TagModal from '../components/TagModal';


const FormSubmit = () => {
  const actionRef = useRef<ActionType>(null);

  const [code, setCode] = useState<any>();

  const getCode = async () => {
    const res: any = await getCodeApi();
    setCode(res.data);
  }

  const getData = async (params = {}, sorter?: any) => {
    const sortParams = {
      sorter
    }
    const req = { ...params, ...sortParams }
    const result: any = await getAll(req);
    return {
      data: result.data.data.list,
      total: result.data.data.count,
      success: true,
    };
  };

  const colums: any[] = [
    {
      title: '头像',
      dataIndex: 'imgs',
      key: 'imgs',
      align: 'center',
      render: (_: any, record: any) => <Image width={50} src={record.imgs} />
    },
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
      // defaultSortOrder: 'ascend',
      sorter: true
    },
    {
      title: '爱好',
      dataIndex: 'skill',
      key: 'skill',
      align: 'center'
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      align: 'center',
      render: (_: any, record: any) => (
        <Space>
          {
            record.tags.map((item: any) => <Tag key={item.id} color='orange'>{item.tag}</Tag>)
          }
        </Space>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'date',
      key: 'date',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      align: 'center',
      fixed: 'right',
      render: (_: any, record: any) => {
        record.imgs = [{
          url: record.imgs,
          status: 'done'
        }]
        return (
          <Space>
            <AddForm
              code={code}
              initValues={record}
              buttonTitle='编辑'
              refresh={() => actionRef?.current?.reload()}
              codeFn={getCode}
            />
            <Button type='link' danger onClick={() => deleteData(record.id)}>删除</Button>
            <TagModal id={record.id} refresh={() => actionRef?.current?.reload()}/>
          </Space>
        )
      }

    }
  ];
  const exportTable = async () => {
    const { data, headers }: any = await tableExport();
    const contentDisposition = headers.get('content-disposition');
    const fileName = contentDisposition?.split('=').at(-1) || '';
    const b = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const src = URL.createObjectURL(b);
    if (src) {
      const elem = document.createElement('a');
      elem.download = fileName;
      elem.href = src;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }

  const deleteData = (id: number) => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除?',
      okText: '确定',
      cancelText: '取消',
      onOk: async (close) => {
        const result: any = await deleteByIdApi(id);
        const { code, msg } = result.data;
        if (code === 200) {
          message.success(msg);
          actionRef.current?.reload();
        } else {
          message.error(msg);
        }
        close();
      },
    });
  };

  const props: UploadProps = {
    name: 'file',
    action: 'http://localhost:3000/test/tableImport',
    showUploadList: false,
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useMount(() => {
    getCode();
    getData({ pageSize: 5, current: 1 });
  });
  return (
    <ProTable
      rowKey="id"
      actionRef={actionRef}
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
        <AddForm
          buttonTitle={'新增'}
          code={code}
          codeFn={getCode}
          refresh={() => actionRef?.current?.reload()}
        />,
        <Button type='primary' key="export" onClick={() => exportTable()}>
          导出
        </Button>,
        <Upload {...props}>
          <Button type='primary' danger key="import">导入</Button>
        </Upload>
      ]}
    />
  );
};

export default FormSubmit;
