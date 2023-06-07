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
        console.log('error', error);
        response.data
          ? message.error(`${response.data.msg}`)
          : message.error(`${error.message}`);
      });
  });
};

export default ajax;
