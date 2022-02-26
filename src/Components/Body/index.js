import React, { Component } from 'react';
import './content.css';
import { Layout, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export class Body extends Component {
  render() {
    return (
      <Layout>
        <Header className="site-layout-background header-custom" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          asdhaksdj
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}

export default Body