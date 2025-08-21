import { request } from '@/service/request';

/** 获取cvm信息列表 */
export function fetchGetCvmList(params?: Api.Env.CvmSearchParams) {
  return request<Api.Env.CvmList>({
    url: '/env/cvm/list',
    method: 'get',
    params
  });
}
