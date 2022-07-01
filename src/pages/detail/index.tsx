import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
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
  { name: '所在机房', value: '宁波交警1#机房' },
];
const infoData = [defaultData, [], [], []];
enum INFOKEY {
  BASIC,
  BELONG,
  SERVICE,
  RECORD,
}

const DetailPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<INFOKEY>(INFOKEY.BASIC);
  const [currentInfo, setCurrentInfo] = useState<{ name: string, value: string }[]>([]);

  useEffect(() => {
    setCurrentInfo(infoData[activeKey]);
  }, [activeKey]);

  return (
    <View className='main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='body'>
        <View className='title'>资产信息</View>
        <View className='infoButtonsRow'>
          <View
            className={activeKey === INFOKEY.BASIC ? 'infoButton infoButtonFirst infoButtonActive' : 'infoButton infoButtonFirst'}
            onClick={() => setActiveKey(INFOKEY.BASIC)}
          >
            基本信息
          </View>
          <View
            className={activeKey === INFOKEY.BELONG ? 'infoButton infoButtonActive' : 'infoButton'}
            onClick={() => setActiveKey(INFOKEY.BELONG)}
          >
            所属信息
          </View>
          <View
            className={activeKey === INFOKEY.RECORD ? 'infoButton infoButtonActive' : 'infoButton'}
            onClick={() => setActiveKey(INFOKEY.RECORD)}
          >
            服务信息
          </View>
          <View
            className={activeKey === INFOKEY.SERVICE ? 'infoButton infoButtonLst infoButtonActive' : 'infoButton infoButtonLst'}
            onClick={() => setActiveKey(INFOKEY.SERVICE)}
          >
            过往记录
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
