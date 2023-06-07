import ajax from "./ajax";
export const addData = (data: any): Promise<any> =>
  ajax(`/api/test/add`, data, "post");

export const getAll = (data: any) =>
  ajax(`/api/test/getAll`, data, "post");

export const tableExport = (data?: any) =>
  ajax(`/api/test/tableExport`, data, "post", { responseType: "blob" });

export const getCodeApi = (data?: any) => ajax(`/api/user/code`, data);

export const deleteByIdApi = (id: any) => ajax(`/api/test/deleteById/${id}`, {}, 'DELETE')

export const updateByIdApi = (id: number, data: any) => ajax(`/api/test/updateById/${id}`, data, 'PUT')

export const editTagApi = (data: any) => ajax(`/api/user/editTags`, data, 'POST')
