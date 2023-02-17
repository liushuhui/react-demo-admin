import { message } from 'antd';
import axios from 'axios';

const ajax = (url: string, params = {}, type = 'GET') => {
  return new Promise(resolve => {
    let promise;
    if (type === 'GET') {
      promise = axios.get(url, { params });
    } else {
      promise = axios.post(url, params);
    }
    promise
      .then(res => {
        resolve(res?.data);
      })
      .catch(error => {
        message.error(`请求出错了：${error.message}`);
      });
  });
};

export default ajax;
