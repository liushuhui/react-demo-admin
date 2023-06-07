import { ModalForm, ProForm, ProFormDigit, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { Button, Input, Space, message } from "antd";
import { addData, updateByIdApi } from "../../api";
import { useRequest } from "ahooks";
import { FC } from "react";
interface AddFormPropsType {
  buttonTitle: string;
  initValues?: object;
  code: string;
  refresh: () => void;
  codeFn: () => void;
}
const AddForm: FC<AddFormPropsType> = (props: any) => {
  const {
    buttonTitle,
    refresh,
    initValues = {},
    code,
    codeFn
  } = props;

  const { run } = useRequest(async (id, values) => {
    values.imgs = values?.imgs?.[0]?.url ? values?.imgs[0]?.url : values?.imgs?.[0]?.response?.data;
    return buttonTitle === '新增' ? addData(values) : updateByIdApi(id, values)
  }, {
    manual: true,
    onSuccess: () => {
      message.success(`${buttonTitle}成功`);
      refresh();
    },
  });

  const onFinish = async (values: any): Promise<any> => {
    run(initValues.id, values);
  };
  return (
    <ModalForm
      width={500}
      layout="horizontal"
      title={buttonTitle}
      initialValues={initValues}
      modalProps={{ destroyOnClose: true }}
      // submitter={{ submitButtonProps: { loading } }}
      onFinish={async (values) => {
        await onFinish(values);
        return true;
      }}
      trigger={
        <Button type={buttonTitle === '编辑' ? 'link' : 'primary'}>
          {buttonTitle}
        </Button>
      }
    >
      <ProFormUploadButton
        fieldProps={{
          accept: 'image/*',
          headers: {
          },
        }}
        // accept='.png, .jepg, .jpg'
        action="/api/imgs/upload"
        label="头像"
        name="imgs"
        listType="picture-card"
      />
      <ProFormText
        name={'name'}
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      />
      <ProFormDigit name={'age'} label="年龄" />
      <ProFormText
        name={'skill'}
        label="爱好"
      />
      <ProForm.Item label="验证码" name="code">
        <Space>
          <Input />
          <span onClick={codeFn} dangerouslySetInnerHTML={{ __html: code }}></span>
        </Space>
      </ProForm.Item>
    </ModalForm>
  );
}
export default AddForm;
