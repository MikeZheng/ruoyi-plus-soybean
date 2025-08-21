import { request } from '@/service/request';

/** 获取redis增强版列表 */
export function fetchGetRedisList(params?: Api.Env.RedisSearchParams) {
  return request<Api.Env.RedisList>({
    url: '/env/redis/list',
    method: 'get',
    params
  });
}

/** 新增redis增强版 */
export function fetchCreateRedis(data: Api.Env.RedisOperateParams) {
  return request<boolean>({
    url: '/env/redis',
    method: 'post',
    data
  });
}

/** 修改redis增强版 */
export function fetchUpdateRedis(data: Api.Env.RedisOperateParams) {
  return request<boolean>({
    url: '/env/redis',
    method: 'put',
    data
  });
}

/** 批量删除redis增强版 */
export function fetchBatchDeleteRedis(ids: CommonType.IdType[]) {
  return request<boolean>({
    url: `/env/redis/${ids.join(',')}`,
    method: 'delete'
  });
}
