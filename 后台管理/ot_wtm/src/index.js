/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-07-24 02:18:59
 * @modify date 2018-09-10 02:18:59
 * @desc [description]
*/
import 'antd/dist/antd.less'
import 'ant-design-pro/dist/ant-design-pro.css'
import 'nprogress/nprogress.css'
import { notification } from 'antd';
import App from "app/index";
import * as React from 'react';
import ReactDOM from 'react-dom';
import "./style.less";
notification.config({
  duration: 3,
  top: 60
}); 
ReactDOM.render(<App />,
  document.getElementById('root'));
 