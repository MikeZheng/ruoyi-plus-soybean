import { request } from '@/service/request';

/** 获取物理子系统列表 */
export function fetchGetSubsystemList(params?: Api.Env.SubsystemSearchParams) {
  return request<Api.Env.SubsystemList>({
    url: '/env/subsystem/list',
    method: 'get',
    params
  });
}

/** 新增物理子系统 */
export function fetchCreateSubsystem(data: Api.Env.SubsystemOperateParams) {
  return request<boolean>({
    url: '/env/subsystem',
    method: 'post',
    data
  });
}

/** 修改物理子系统 */
export function fetchUpdateSubsystem(data: Api.Env.SubsystemOperateParams) {
  return request<boolean>({
    url: '/env/subsystem',
    method: 'put',
    data
  });
}

/** 批量删除物理子系统 */
export function fetchBatchDeleteSubsystem(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/subsystem/${ids.join(',')}`,
    method: 'delete'
  });
}
