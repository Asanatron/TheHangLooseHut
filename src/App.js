import React, { Component } from 'react'
import { Layout } from 'antd';
import Sidebar from './Components/Sidebar';
import Body from './Components/Body';


const { Sider } = Layout;

export class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Sidebar />
        </Sider>
        <Layout className="site-layout">
          <Body />
        </Layout>
      </Layout>
      </div>
    )
  }
}

export default App