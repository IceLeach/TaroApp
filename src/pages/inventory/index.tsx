import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { AtInput, AtModal, AtModalAction, AtModalContent, AtModalHeader, AtNavBar, AtTextarea } from 'taro-ui';
import { View, Image, Text, Picker, Button } from '@tarojs/components';
import QrScannerComponent from '../../components/QrScanner';
import headerImg from '../../assets/headerImg.png';
import headerIcon from '../../assets/headerIcon.png';
import returnIcon from '../../assets/return.png';
import addIcon from '../../assets/add.png';
import scanIcon from '../../assets/scan.png';
import okIcon from '../../assets/ok.png';
import trueImg from '../../assets/true.png';
import falseImg from '../../assets/false.png';
import './index.less';

interface BodyType {
  type: 'default' | 'afterScan';
  props?: {
    state: 'ok' | 'errorLoss' | 'errorSurplus';
    innerData: any;
    inputData: string;
  };
}

enum SELECTKEY {
  ALL,
  CORRECT,
  LOSS,
  SURPLUS,
}

const pickerItemList = ['1', '2', '3'];

const bodyData = [
  {
    id: 1,
    name: 'IT机柜009',
    code: 'JHJ000000003',
    model: 'S1700',
    type: '基础设施|机架|IT机柜',
    address: '某市交警支队16#机房3',
  },
  {
    id: 2,
    name: 'IT机柜009',
    code: 'JHJ000000003',
    model: 'S1700',
    type: '基础设施|机架|IT机柜',
    address: '某市交警支队16#机房3',
  },
  {
    id: 3,
    name: 'IT机柜009',
    code: 'JHJ000000003',
    model: 'S1700',
    type: '基础设施|机架|IT机柜',
    address: '某市交警支队16#机房3',
  },
  {
    id: 4,
    name: 'IT机柜009',
    code: 'JHJ000000003',
    model: 'S1700',
    type: '基础设施|机架|IT机柜',
    address: '某市交警支队16#机房3',
  },
  {
    id: 5,
    name: 'IT机柜009',
    code: 'JHJ000000003',
    model: 'S1700',
    type: '基础设施|机架|IT机柜',
    address: '某市交警支队16#机房3',
  },
];

const InventoryPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>();
  // const [currentInfo, setCurrentInfo] = useState<{ name: string, value: string }[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [activeSelectKey, setActiveSelectKey] = useState<SELECTKEY>(SELECTKEY.ALL);
  const [qrScannerVisible, setQrScannerVisible] = useState<boolean>(false);
  const [reviseModalData, setReviseModalData] = useState<{ visible: boolean, input: string }>({ visible: false, input: '' });
  const [addModalData, setAddModalData] = useState<{ visible: boolean, select: string | null, input: string }>({ visible: false, select: null, input: '' });
  const [bodyType, setBodyType] = useState<BodyType>({ type: 'default' });

  const searchData = (mainKey: string, inputValue: string, selectedKey: SELECTKEY) => {
    console.log('activeKey', mainKey, inputValue, selectedKey);
  }

  const searchSelectKey = (key: SELECTKEY) => {
    if (activeKey && key !== activeSelectKey) {
      setActiveSelectKey(key);
      searchData(activeKey, searchInputValue, key);
    }
  }

  useEffect(() => {
    if (activeKey) {
      setSearchInputValue('');
      setActiveSelectKey(SELECTKEY.ALL);
      searchData(activeKey, '', SELECTKEY.ALL);
    }
  }, [activeKey]);

  return (
    <View className='inventory_main'>
      <View className='header' style={{ backgroundImage: `url(${headerImg})` }}>
        <View className='headerContent'>
          <Image src={headerIcon} className='icon' />
          <Text className='name'>宁波交警局资产管理系统</Text>
        </View>
      </View>
      <View className='inventory_body'>
        <View style={{ width: '100%', height: qrScannerVisible ? '100%' : 0 }}>
          <QrScannerComponent
            visible={qrScannerVisible}
            onResult={(result) => {
              console.log('result', result);
              setBodyType({
                type: 'afterScan',
                props: {
                  state: 'errorLoss',
                  innerData: {},
                  inputData: '',
                },
              });
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
        <View className='inventory_body_main' style={{ display: qrScannerVisible ? 'none' : 'block' }}>
          <AtNavBar
            color='#fff'
            leftIconType='chevron-left'
            className='inventory_navBar'
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
            资产盘点
          </AtNavBar>
          {bodyType.type === 'default' ? (
            <>
              <Picker className='inventory_picker' mode='selector' range={pickerItemList} onChange={(e) => setActiveKey(pickerItemList[e.detail.value])}>
                <View className='inventory_picker_content'>
                  <View>
                    <span className='content_title'>盘点单号：</span>
                    <span className='content_value'>{activeKey ?? ''}</span>
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
                <View className='search_input_row'>
                  <AtInput
                    className='search_input'
                    value={searchInputValue}
                    name='value'
                    type='text'
                    placeholder='搜索资产编号、设备名称'
                    onChange={(value) => setSearchInputValue(value as string)}
                  />
                  <View
                    className='search_text'
                    onClick={() => activeKey && searchData(activeKey, searchInputValue, activeSelectKey)}
                  >
                    搜索
                  </View>
                </View>
                <View className='search_select_row'>
                  <View
                    className={activeSelectKey === SELECTKEY.ALL ? 'select_col select_col_selected' : 'select_col'}
                    onClick={() => searchSelectKey(SELECTKEY.ALL)}
                  >
                    全部
                  </View>
                  <View
                    className={activeSelectKey === SELECTKEY.CORRECT ? 'select_col select_col_selected' : 'select_col'}
                    onClick={() => searchSelectKey(SELECTKEY.CORRECT)}
                  >
                    正确
                  </View>
                  <View
                    className={activeSelectKey === SELECTKEY.LOSS ? 'select_col select_col_selected' : 'select_col'}
                    onClick={() => searchSelectKey(SELECTKEY.LOSS)}
                  >
                    盘亏
                  </View>
                  <View
                    className={activeSelectKey === SELECTKEY.SURPLUS ? 'select_col select_col_selected' : 'select_col'}
                    onClick={() => searchSelectKey(SELECTKEY.SURPLUS)}
                  >
                    盘盈
                  </View>
                </View>
              </View>
              <View className='inventory_list'>
                {bodyData.map(d => (
                  <View key={d.id} className='inventory_list_item'>
                    <View className='item_content'>
                      <View className='item_content_title'>{d.name}</View>
                      <View className='item_content_codeAndModel'>
                        <View className='item_content_code'>资产编号：{d.code}</View>
                        <View>型号：{d.model}</View>
                      </View>
                      <View className='item_content_row'>类型：{d.type}</View>
                      <View className='item_content_row'>位置：{d.address}</View>
                    </View>
                    <View className='item_actions'>
                      <View className='item_actions_button'>正确</View>
                      <View
                        className='item_actions_button'
                        onClick={() => setReviseModalData({ visible: true, input: '' })}
                      >
                        修正
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <>
              <View className='inventory_scanDetail'>
                <View className='scanDetail_content'>
                  <View className='scanDetail_content_row scanDetail_content_titleRow'>设备名称：IT机柜009 </View>
                  <View className='scanDetail_content_row'>资产编号：JHJ000000003</View>
                  <View className='scanDetail_content_row'>设备类型：机柜</View>
                  <View className='scanDetail_content_row'>设备型号：S1700</View>
                  <View className='scanDetail_content_row'>设备位置：某市交警支队16#机房3</View>
                  <View className='scanDetail_content_row'>设备状态：使用</View>
                </View>
                <View className='scanDetail_img'>
                  <Image className='scanDetail_image' src={bodyType.props?.state === 'ok' ? trueImg : falseImg} />
                </View>
              </View>
              {bodyType.props?.state !== 'ok' ? (
                <View className='inventory_reason'>
                  <View className='inventory_reason_title'>
                    {bodyType.props?.state === 'errorLoss' ? '填写盘亏的原因' : '填写盘盈的原因'}
                  </View>
                  <AtTextarea
                    value={bodyType.props!.inputData}
                    onChange={value => setBodyType(d => ({ type: d.type, props: { ...d.props!, inputData: value } }))}
                    className='inventory_reason_textarea'
                    placeholder=''
                    count={false}
                  />
                  {bodyType.props?.state === 'errorSurplus' ? (
                    <View className='inventory_reason_tip'>
                      注：这里不对该资产进行位置或者状态变更，需要在电脑端【资产管理】中对资产进行相关操作。
                    </View>
                  ) : (
                    ''
                  )}
                </View>
              ) : (
                ''
              )}
            </>
          )}
        </View>
        {bodyType.type === 'default' ? (
          <View className='inventory_bottom' style={{ display: qrScannerVisible ? 'none' : 'flex' }}>
            <View
              className='bottom_button'
              onClick={() => setAddModalData({ visible: true, select: null, input: '' })}
            >
              <Image className='button_image' src={addIcon} />
              添加盘盈资产
            </View>
            <View className='bottom_divider' />
            <View
              className='bottom_button'
              onClick={() => setQrScannerVisible(true)}
            >
              <Image className='button_image' src={scanIcon} />
              扫一扫
            </View>
          </View>
        ) : bodyType.props?.state === 'ok' ? (
          <View className='inventory_bottom_single' style={{ display: qrScannerVisible ? 'none' : 'flex' }}>
            <View
              className='bottom_button'
              onClick={() => setQrScannerVisible(true)}
            >
              <Image className='button_image' src={scanIcon} />
              继续扫一扫
            </View>
          </View>
        ) : (
          <View className='inventory_bottom_ok' style={{ display: qrScannerVisible ? 'none' : 'flex' }}>
            <View
              className='bottom_button'
              onClick={() => setBodyType({ type: 'default' })}
            >
              <Image className='button_image' src={okIcon} />
              确定
            </View>
          </View>
        )}
      </View>
      <AtModal closeOnClickOverlay={false} isOpened={reviseModalData.visible}>
        <AtModalHeader>资产修正</AtModalHeader>
        <AtModalContent>
          <AtTextarea
            value={reviseModalData.input}
            onChange={value => setReviseModalData(d => ({ ...d, input: value }))}
            placeholder='填写盘亏的原因'
            count={false}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setReviseModalData({ visible: false, input: '' })}>取消</Button>
          <Button style={{ color: '#1890FF' }} onClick={() => setReviseModalData({ visible: false, input: '' })}>保存</Button>
        </AtModalAction>
      </AtModal>
      <AtModal className='inventory_addModel' closeOnClickOverlay={false} isOpened={addModalData.visible}>
        <AtModalHeader>添加盘盈资产</AtModalHeader>
        <AtModalContent>
          <View className='inventory_addModel_textRow'>资产：</View>
          <Picker
            className='inventory_addModel_picker'
            mode='selector'
            range={pickerItemList}
            onChange={(e) => setAddModalData(d => ({ ...d, select: pickerItemList[e.detail.value] }))}
          >
            <View className='inventory_addModel_picker_content'>
              <View>{addModalData.select ?? '请选择要添加到此盘点单下的资产'}</View>
              <Image className='content_image' src={returnIcon} />
            </View>
          </Picker>
          <View className='inventory_addModel_textRow inventory_addModel_textRowMarginTop'>备注：</View>
          <AtTextarea
            value={addModalData.input}
            onChange={value => setAddModalData(d => ({ ...d, input: value }))}
            className='inventory_addModel_textArea'
            placeholder='请输入该资产盘盈的原因'
            count={false}
          />
        </AtModalContent>
        <AtModalAction>
          <Button onClick={() => setAddModalData({ visible: false, select: null, input: '' })}>取消</Button>
          <Button style={{ color: '#1890FF' }} onClick={() => setAddModalData({ visible: false, select: null, input: '' })}>保存</Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
};

export default InventoryPage;
