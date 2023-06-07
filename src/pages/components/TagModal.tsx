import { ModalForm, ProFormSelect } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRequest } from "ahooks";
import { editTagApi } from "../../api";
interface TagModalPropsType {
  id: number;
  initValues?: object;
  refresh: () => void;
}
const TagModal = (props: TagModalPropsType) => {
  const {
    id,
    refresh,
    initValues = {},
  } = props;

  const { run } = useRequest(async (values) => {
    const params = { ...values, userId: id }
    return editTagApi(params)
  }, {
    manual: true,
    onSuccess: () => {
      message.success(`编辑成功`);
      refresh();
    },
  });
  const onFinish = async (values: any): Promise<any> => {
    run(values);
  };
  return (
    <ModalForm
      width={500}
      layout="horizontal"
      title={'权限管理'}
      initialValues={initValues}
      modalProps={{ destroyOnClose: true }}
      // submitter={{ submitButtonProps: { loading } }}
      onFinish={async (values) => {
        await onFinish(values);
        return true;
      }}
      trigger={
        <Button type="link">
          编辑标签
        </Button>
      }
    >
      <ProFormSelect
        name={'tags'}
        label='权限'
        mode="multiple"
        rules={[{ required: true, message: '请选择权限' }]}
        valueEnum={{
          '管理员': '管理员',
          '运维': '运维',
          '开发': '开发',
          '测试': '测试'
        }}
      />
    </ModalForm>
  );
}
export default TagModal;
