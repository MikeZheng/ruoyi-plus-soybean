import { request } from '@/service/request';

/** 获取mysql增强版列表 */
export function fetchGetMysqlEnhanceList(params?: Api.Env.MysqlEnhanceSearchParams) {
  return request<Api.Env.MysqlEnhanceList>({
    url: '/env/mysqlEnhance/list',
    method: 'get',
    params
  });
}

/** 新增mysql增强版 */
export function fetchCreateMysqlEnhance(data: Api.Env.MysqlEnhanceOperateParams) {
  return request<boolean>({
    url: '/env/mysqlEnhance',
    method: 'post',
    data
  });
}

/** 修改mysql增强版 */
export function fetchUpdateMysqlEnhance(data: Api.Env.MysqlEnhanceOperateParams) {
  return request<boolean>({
    url: '/env/mysqlEnhance',
    method: 'put',
    data
  });
}

/** 批量删除mysql增强版 */
export function fetchBatchDeleteMysqlEnhance(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/mysqlEnhance/${ids.join(',')}`,
    method: 'delete'
  });
}
