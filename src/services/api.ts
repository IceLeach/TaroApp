import Taro from '@tarojs/taro';

export async function fetch() {
  return Taro.request({
    url: '',
    method: 'GET',
  });
}
