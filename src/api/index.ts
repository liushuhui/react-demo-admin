import ajax from './ajax';
const baseUrl = 'http://localhost:3000';
export const addData = (data: any): Promise<any> =>
  ajax(`${baseUrl}/test/add`, data, 'post');
export const getAll = (data: any) =>
  ajax(`${baseUrl}/test/getAll`, data, 'GET');
