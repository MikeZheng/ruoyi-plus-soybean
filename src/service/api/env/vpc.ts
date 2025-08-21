import { request } from '@/service/request';

/** 获取vpc列表 */
export function fetchGetVpcList(params?: Api.Env.VpcSearchParams) {
  return request<Api.Env.VpcList>({
    url: '/env/vpc/list',
    method: 'get',
    params
  });
}

/** 新增vpc */
export function fetchCreateVpc(data: Api.Env.VpcOperateParams) {
  return request<boolean>({
    url: '/env/vpc',
    method: 'post',
    data
  });
}

/** 修改vpc */
export function fetchUpdateVpc(data: Api.Env.VpcOperateParams) {
  return request<boolean>({
    url: '/env/vpc',
    method: 'put',
    data
  });
}

/** 批量删除vpc */
export function fetchBatchDeleteVpc(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/vpc/${ids.join(',')}`,
    method: 'delete'
  });
}
