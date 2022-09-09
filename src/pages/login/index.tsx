import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { AtButton, AtInput } from 'taro-ui';
import { View, Image } from '@tarojs/components';
import headerIcon from '../../assets/headerIcon.png';
import './index.less';

const LoginPage: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    console.log('login', account, password);
    localStorage.setItem('token', 'test');
    Taro.redirectTo({
      url: '/pages/index/index'
    });
  }

  return (
    <View className='login_main'>
      <View className='login_header'>
        <Image src={headerIcon} className='login_header_icon' />
        <View className='login_header_title'>宁波交警局资产管理系统</View>
      </View>
      <View className='login_box'>
        <View className='login_box_title'>用户登录</View>
        <AtInput
          className='login_box_input'
          value={account}
          name='account'
          type='text'
          placeholder='账号'
          onChange={(value) => setAccount(value as string)}
        />
        <AtInput
          className='login_box_input'
          value={password}
          name='value'
          type='password'
          placeholder='密码'
          onChange={(value) => setPassword(value as string)}
        />
        <AtButton
          type='primary'
          className='login_box_button'
          onClick={login}
        >
          登录
        </AtButton>
      </View>
    </View>
  );
}

export default LoginPage;
