import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { AtNavBar } from 'taro-ui';
import { View, Image, Text } from '@tarojs/components';
import headerImg from '../../assets/headerImg.png';
import headerIcon from '../../assets/headerIcon.png';
import './index.less';

interface BodyType {
  type: 'default' | 'afterScan';
  props?: {
    state: 'ok' | 'errorLoss' | 'errorSurplus';
    innerData: any;
    inputData: string;
  };
}

const bodyData = [
  {
    id: 1,
    person: '管理员',
    code: '202208182104307631010',
    date: '2022-5-11',
    finishDate: '2022-6-11',
    address: '某市交警支队16#机房1',
    sum: 66,
    loss: 5,
    win: 10,
    roate: '66%',
  },
  {
    id: 2,
    person: '管理员',
    code: '202208182104307631010',
    date: '2022-5-11',
    finishDate: '2022-6-11',
    address: '某市交警支队16#机房1',
    sum: 66,
    loss: 5,
    win: 10,
    roate: '66%',
  },
  {
    id: 3,
    person: '管理员',
    code: '202208182104307631010',
    date: '2022-5-11',
    finishDate: '2022-6-11',
    address: '某市交警支队16#机房1',
    sum: 66,
    loss: 5,
    win: 10,
    roate: '66%',
  },
  {
    id: 4,
    person: '管理员',
    code: '202208182104307631010',
    date: '2022-5-11',
    finishDate: '2022-6-11',
    address: '某市交警支队16#机房1',
    sum: 66,
    loss: 5,
    win: 10,
    roate: '66%',
  },
  {
    id: 5,
    person: '管理员',
    code: '202208182104307631010',
    date: '2022-5-11',
    finishDate: '2022-6-11',
    address: '某市交警支队16#机房1',
    sum: 66,
    loss: 5,
    win: 10,
    roate: '66%',
  },
];

const RecordPage: React.FC = () => {
  const [bodyType, setBodyType] = useState<BodyType>({ type: 'default' });

  return (
    <View className='record_main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='record_body'>
        <AtNavBar
          color='#fff'
          leftIconType='chevron-left'
          className='record_navBar'
          onClickLeftIcon={() => {
            if (bodyType.type === 'default') {
              Taro.redirectTo({
                url: '/pages/index/index'
              });
            } else {
              setBodyType({ type: 'default' });
            }
          }}
        >
          盘点记录
        </AtNavBar>
        <View className='record_list'>
          {bodyData.map(d => (
            <View className='record_list_item' key={d.id}>
              <View className='item_row'>
                <View className='item_col'>盘点单号：{d.code}</View>
              </View>
              <View className='item_row'>
                <View className='item_col item_col_two'>盘点人：{d.person}</View>
                <View className='item_col item_col_two'>盘点位置：{d.address}</View>
              </View>
              <View className='item_row'>
                <View className='item_col item_col_two'>盘点时间：{d.date}</View>
                <View className='item_col item_col_two'>完成日期：{d.finishDate}</View>
              </View>
              <View className='item_row'>
                <View className='item_col item_col_four'>盘点总数：{d.sum}</View>
                <View className='item_col item_col_four'>盘盈：{d.win}</View>
                <View className='item_col item_col_four'>盘亏：{d.loss}</View>
                <View className='item_col item_col_four'>成功率：{d.roate}</View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RecordPage;
