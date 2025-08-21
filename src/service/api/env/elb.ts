import { request } from '@/service/request';

/** 获取elb信息列表 */
export function fetchGetElbList(params?: Api.Env.ElbSearchParams) {
  return request<Api.Env.ElbList>({
    url: '/env/elb/list',
    method: 'get',
    params
  });
}

/** 新增elb信息 */
export function fetchCreateElb(data: Api.Env.ElbOperateParams) {
  return request<boolean>({
    url: '/env/elb',
    method: 'post',
    data
  });
}

/** 修改elb信息 */
export function fetchUpdateElb(data: Api.Env.ElbOperateParams) {
  return request<boolean>({
    url: '/env/elb',
    method: 'put',
    data
  });
}

/** 批量删除elb信息 */
export function fetchBatchDeleteElb(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/elb/${ids.join(',')}`,
    method: 'delete'
  });
}
