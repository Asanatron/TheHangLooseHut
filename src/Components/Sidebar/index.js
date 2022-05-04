import React, { Component } from 'react';
import {
  UploadOutlined,
  PieChartOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './sider.css';
import HistoryHooks from '../HistoryHooks';

export class Sidebar extends Component {
  render() {
    const navigate = this.props.navigate;

    return (
      <div className='sider-custom'>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item className='sidebar-text' key="1" icon={<PieChartOutlined />} onClick={() => navigate('TheHangLooseHut/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item className='sidebar-text' key="2" icon={<UploadOutlined />} onClick={() => navigate('TheHangLooseHut/upload')}>
            Upload Design
          </Menu.Item>
          {/* <Menu.Item className='sidebar-text' key="3" icon={<NotificationOutlined />} onClick={() => navigate('/status')}>
            Designs 
          </Menu.Item> */}
        </Menu>
      </div>
    )
  }
}

export default HistoryHooks(Sidebar)