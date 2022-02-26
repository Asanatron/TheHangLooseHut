import React, { Component } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './sider.css';

const { SubMenu } = Menu;

export class Sidebar extends Component {
  render() {
    return (
      <div className='sider-custom'>
        <div className="logo">

        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Sidebar