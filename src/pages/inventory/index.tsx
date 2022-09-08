import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { AtButton, AtInput, AtNavBar } from 'taro-ui';
import { View, Image, Text, Picker } from '@tarojs/components';
import headerImg from '../../assets/headerImg.png';
import headerIcon from '../../assets/headerIcon.png';
import returnIcon from '../../assets/return.png';
import './index.less';

const pickerItemList = ['1', '2', '3'];

const InventoryPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>();
  // const [currentInfo, setCurrentInfo] = useState<{ name: string, value: string }[]>([]);

  useEffect(() => {
    // setCurrentInfo(infoData[activeKey]);
  }, [activeKey]);

  return (
    <View className='main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='inventory_body'>
        <AtNavBar
          color='#fff'
          leftIconType='chevron-left'
          className='inventory_navBar'
          onClickLeftIcon={() => {
            Taro.redirectTo({
              url: '/pages/index/index'
            });
          }}
        >
          资产盘点
        </AtNavBar>
        <Picker className='inventory_picker' mode='selector' range={pickerItemList} onChange={(e) => console.log(e.detail.value)}>
          <View className='inventory_picker_content'>
            <View>
              <span className='content_title'>盘点单号：</span>
              <span className='content_value'></span>
            </View>
            <Image className='content_image' src={returnIcon} />
          </View>
        </Picker>
        <View className='inventory_detail'>
          <View className='detail_row'>
            <View className='detail_col'>盘点日期：</View>
            <View className='detail_col'>盘点位置：</View>
          </View>
          <View className='detail_row'>
            <View className='detail_col'>盘点类型：</View>
            <View className='detail_col'>盘点人：</View>
          </View>
        </View>
        <View className='inventory_search'>
          {/* <View>
            <AtInput
              name='value'
              type='text'
              placeholder='搜索资产编号、设备名称'
              onChange={(value) => console.log(value)}
            />
          </View> */}
          <View></View>
        </View>
        <View className='inventory_bottom'>
          <AtButton type='primary'>按钮1</AtButton>
          <AtButton type='primary'>按钮2</AtButton>
        </View>
      </View>
    </View>
  );
};

export default InventoryPage;
