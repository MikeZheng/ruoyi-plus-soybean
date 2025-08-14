import { request } from '@/service/request';

/** 获取部署单元列表 */
export function fetchGetDeployUnitList(params?: Api.Env.DeployUnitSearchParams) {
  return request<Api.Env.DeployUnitList>({
    url: '/env/deployUnit/list',
    method: 'get',
    params
  });
}

/** 新增部署单元 */
export function fetchCreateDeployUnit(data: Api.Env.DeployUnitOperateParams) {
  return request<boolean>({
    url: '/env/deployUnit',
    method: 'post',
    data
  });
}

/** 修改部署单元 */
export function fetchUpdateDeployUnit(data: Api.Env.DeployUnitOperateParams) {
  return request<boolean>({
    url: '/env/deployUnit',
    method: 'put',
    data
  });
}

/** 批量删除部署单元 */
export function fetchBatchDeleteDeployUnit(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/deployUnit/${ids.join(',')}`,
    method: 'delete'
  });
}
