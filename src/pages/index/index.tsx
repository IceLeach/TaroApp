import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import QrScannerComponent from '../../components/QrScanner';
import headerImg from '../../assets/headerImg.png';
import headerIcon from '../../assets/headerIcon.png';
import scanToView from '../../assets/scanToView.png';
import scanToCount from '../../assets/scanToCount.png';
import countRecord from '../../assets/countRecord.png';
import './index.less';
// import { AtModal } from 'taro-ui';

const IndexPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [qrScannerVisible, setQrScannerVisible] = useState<boolean>(false);
  // const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (qrScannerVisible) {
      setText('');
    }
  }, [qrScannerVisible]);

  return (
    <View className='main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='body'>
        <View className='valueText' style={{ background: '#9ca0a3' }}>{text}</View>
        <View className={qrScannerVisible ? 'qrScannerArea' : 'qrScannerAreaHidden'} style={{ width: '100%', height: qrScannerVisible ? '100%' : 0 }}>
          <QrScannerComponent
            visible={qrScannerVisible}
            onResult={(result) => {
              setText(result);
              setQrScannerVisible(false);
            }}
            onError={() => {
              setQrScannerVisible(false);
            }}
            onCancel={() => {
              setQrScannerVisible(false);
            }}
          />
        </View>
        <View style={{ display: qrScannerVisible ? 'none' : 'block' }}>
          <View
            className='button'
            onClick={() => {
              setQrScannerVisible(true);
              // Taro.scanCode({
              //   success: (res) => {
              //     console.log('res', res);
              //   },
              //   fail: (res) => {
              //     console.log('error', res);
              //   },
              // });
            }}
          >
            <View className='buttonBody'>
              <View className='imgBlock'>
                <Image src={scanToView} className='img' />
              </View>
              <View className='text'>
                <View className='textTitle'>扫码查看</View>
                <View className='textContent'>扫一扫即可查看该资产的完整档案信息，方便快捷，全面掌握</View>
              </View>
            </View>
          </View>
          <View
            className='button'
            onClick={() => {
              Taro.redirectTo({
                url: '/pages/inventory/index'
              });
            }}
          >
            <View className='buttonBody'>
              <View className='imgBlock'>
                <Image src={scanToCount} className='img' />
              </View>
              <View className='text'>
                <View className='textTitle'>扫码盘点</View>
                <View className='textContent'>支持以物对账和对账对物两种方式对资产进行盘点，功能强大，操作简单，提升盘点效率</View>
              </View>
            </View>
          </View>
          <View
            className='button'
            onClick={() => {
              Taro.redirectTo({
                url: '/pages/detail/index'
              });
            }}
          >
            <View className='buttonBody'>
              <View className='imgBlock'>
                <Image src={countRecord} className='img' />
              </View>
              <View className='text'>
                <View className='textTitle'>盘点记录</View>
                <View className='textContent'>
                  <View>最后的盘点时间：2022-05-11</View>
                  <View>成功率：90%</View>
                  <View>盘正：10</View>
                  <View>盘亏：5</View>
                </View>
              </View>
            </View>
          </View>
          {/* <AtModal
            isOpened={show}
            title='标题'
            cancelText='取消'
            confirmText='确认'
            // onClose={this.handleClose}
            // onCancel={this.handleCancel}
            // onConfirm={this.handleConfirm}
            content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
          /> */}
        </View>
      </View>
    </View>
  );
}

export default IndexPage;
