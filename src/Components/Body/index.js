import React, { Component } from 'react';
import './content.css';
import { Layout, Row, Col } from 'antd';
import Logo from '../../Media/Logo.png'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Upload from '../Upload';
import Status from '../Status';

const { Content, Footer } = Layout;

export class Body extends Component {
  render() {
    return (
      <Layout className='content-background'>
        <Row className='header' align='center'>
          <Col>
            <img alt='TheHangLooseHut' className='header-logo' src={Logo}/>
          </Col>
        </Row>
        <Content style={{ padding: '0 0px 0px 16px' }}>
        <Routes>
          <Route exact path='/TheHangLooseHut/' element={<Dashboard />} />
          {/* <Route exact path='/status' element={<Status />} /> */}
          <Route exact path='/TheHangLooseHut/upload' element={<Upload />} />
        </Routes>
        </Content>
        <Footer className='footer' style={{ textAlign: 'center' }}>© THE HANG LOOSE HUT 2022</Footer>
      </Layout>
    )
  }
}

export default Body