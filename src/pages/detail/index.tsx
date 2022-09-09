import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { AtNavBar } from 'taro-ui';
import Taro from '@tarojs/taro';
import headerImg from '../../assets/headerImg.png';
import headerIcon from '../../assets/headerIcon.png';
import './index.less';

const defaultData = [
  { name: '资产编号', value: 'NBJJ00000001' },
  { name: '资产名称', value: 'OA服务器' },
  { name: '所在机房', value: '宁波交警1#机房' },
  { name: '所在列', value: 'A冷通道' },
  { name: '所在机柜', value: 'A01' },
  { name: '品牌', value: 'DELL' },
  { name: '序列号', value: 'x9383877702' },
  { name: '规格型号', value: '3511' },
  { name: '硬件配置', value: 'CPUI7 内存64G 硬盘320G' },
  { name: '软件配置', value: 'OA系统' },
  { name: '操作系统', value: 'Centos7' },
  { name: '额定功率(W)', value: '200W' },
  { name: '尺寸(CM)', value: '32*12*23' },
];
const infoData = [defaultData, defaultData, defaultData];
enum INFOKEY {
  BASIC,
  RECORD1,
  RECORD2,
}

const DetailPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<INFOKEY>(INFOKEY.BASIC);
  const [currentInfo, setCurrentInfo] = useState<{ name: string, value: string }[]>([]);

  useEffect(() => {
    setCurrentInfo(infoData[activeKey]);
  }, [activeKey]);

  return (
    <View className='detail_main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='detail_body'>
        <AtNavBar
          color='#fff'
          leftIconType='chevron-left'
          className='detail_navBar'
          onClickLeftIcon={() => {
            Taro.redirectTo({
              url: '/pages/index/index'
            });
          }}
        >
          资产档案
        </AtNavBar>
        <View className='infoButtonsRow'>
          <View
            className={activeKey === INFOKEY.BASIC ? 'infoButton infoButtonFirst infoButtonActive' : 'infoButton infoButtonFirst'}
            onClick={() => setActiveKey(INFOKEY.BASIC)}
          >
            基本信息
          </View>
          <View
            className={activeKey === INFOKEY.RECORD1 ? 'infoButton infoButtonActive' : 'infoButton'}
            onClick={() => setActiveKey(INFOKEY.RECORD1)}
          >
            变更记录
          </View>
          <View
            className={activeKey === INFOKEY.RECORD2 ? 'infoButton infoButtonLst infoButtonActive' : 'infoButton infoButtonLst'}
            onClick={() => setActiveKey(INFOKEY.RECORD2)}
          >
            盘点记录
          </View>
        </View>
        <View className='infoData'>
          {currentInfo.map(info => (
            <View className='infoRow' key={info.name}>
              <View className='infoName'>{info.name}</View>
              <View className='infoValue'>{info.value}</View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DetailPage;
