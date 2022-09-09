import Taro, { getCurrentInstance } from '@tarojs/taro'
import React from 'react'
import 'taro-ui/dist/style/index.scss'
import './app.less'

// @ts-ignore
const App: React.FC = (props) => {
  console.log('props', props)
  const token = localStorage.getItem('token')
  const instance = getCurrentInstance();
  const path = instance.router?.path;
  console.log('instance', instance, path ? (path.substring(0, path.indexOf('?'))) : 'none')
  if (path && path.substring(0, path.indexOf('?')) !== '/pages/login/index') {
    console.log('token', token)
    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index'
      });
    }
  }

  return props.children;
}

// class App extends Component {

//   componentDidMount() { }

//   componentDidShow() { }

//   componentDidHide() { }

//   componentDidCatchError() { }

//   // this.props.children 是将要会渲染的页面
//   render() {
//     return this.props.children
//   }
// }

export default App
