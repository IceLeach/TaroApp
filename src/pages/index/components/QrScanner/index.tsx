import React, { useEffect, useRef } from 'react';
import { View } from '@tarojs/components';
import QrScanner from 'qr-scanner';
import './index.less';

interface QrScannerProps {
  visible: boolean;
  onResult: (result: string) => void;
  onError: (error: any) => void;
  onCancel: () => void;
}

const QrScannerComponent: React.FC<QrScannerProps> = (props) => {
  const { visible, onResult, onError, onCancel } = props;
  const qrScannerRef = useRef<QrScanner>();

  useEffect(() => {
    if (visible) {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
      qrScannerRef.current = new QrScanner(
        document.getElementById('video') as HTMLVideoElement,
        result => {
          console.log('decoded qr code:', result)
          if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current = undefined;
          }
          onResult(`${result.data}`);
        },
        {
          onDecodeError: (error) => {
            console.log('error', error)
          },
          highlightScanRegion: true,
          returnDetailedScanResult: true,
        },
      );
      qrScannerRef.current.start().catch(e => {
        console.log('err', e)
        onError(e);
      });
    } else {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current = undefined;
      }
    }
  }, [visible]);

  return (
    <View style={{ width: '100%', height: '100%', padding: 0, display: visible ? 'block' : 'none' }}>
      <View className='cancel'>
        <View
          onClick={() => {
            if (qrScannerRef.current) {
              qrScannerRef.current.stop();
              qrScannerRef.current = undefined;
            }
            onCancel();
          }}
        >
          取消
        </View>
      </View>
      <video id='video' className='video' style={{ width: '100%', height: '100%' }}></video>
    </View>
  );
};

export default QrScannerComponent;
