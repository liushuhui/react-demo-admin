import { message } from "antd";
import axios from "axios";

const ajax = (url: string, data = {}, method = "GET", config = {}) => {
  return new Promise((resolve) => {
    axios({
      url,
      method,
      data,
      ...{ withCredentials: true, ...config },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        const { response } = error;
        response.data
          ? message.error(`请求出错了：${response.data.msg}`)
          : message.error(`请求出错了：${error.message}`);
      });
  });
};

export default ajax;
