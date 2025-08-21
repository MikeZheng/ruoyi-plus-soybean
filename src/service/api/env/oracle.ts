import { request } from '@/service/request';

/** 获取oracle列表 */
export function fetchGetOracleList(params?: Api.Env.OracleSearchParams) {
  return request<Api.Env.OracleList>({
    url: '/env/oracle/list',
    method: 'get',
    params
  });
}

/** 新增oracle */
export function fetchCreateOracle(data: Api.Env.OracleOperateParams) {
  return request<boolean>({
    url: '/env/oracle',
    method: 'post',
    data
  });
}

/** 修改oracle */
export function fetchUpdateOracle(data: Api.Env.OracleOperateParams) {
  return request<boolean>({
    url: '/env/oracle',
    method: 'put',
    data
  });
}

/** 批量删除oracle */
export function fetchBatchDeleteOracle(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/oracle/${ids.join(',')}`,
    method: 'delete'
  });
}
