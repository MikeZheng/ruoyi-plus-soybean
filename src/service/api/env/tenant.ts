import { request } from '@/service/request';

/** 获取环境租户信息列表 */
export function fetchGetTenantList(params?: Api.Env.TenantSearchParams) {
  return request<Api.Env.TenantList>({
    url: '/env/tenant/list',
    method: 'get',
    params
  });
}

/** 新增环境租户信息 */
export function fetchCreateTenant(data: Api.Env.TenantOperateParams) {
  return request<boolean>({
    url: '/env/tenant',
    method: 'post',
    data
  });
}

/** 修改环境租户信息 */
export function fetchUpdateTenant(data: Api.Env.TenantOperateParams) {
  return request<boolean>({
    url: '/env/tenant',
    method: 'put',
    data
  });
}

/** 批量删除环境租户信息 */
export function fetchBatchDeleteTenant(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/tenant/${ids.join(',')}`,
    method: 'delete'
  });
}
