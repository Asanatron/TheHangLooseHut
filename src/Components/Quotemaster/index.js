import React, { Component } from 'react'
import { Layout, Row, Col, Spin, Divider, Button} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Quoter from '../Quoter';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export class Quotemaster extends Component {
  render() {
    return (
      <div>
        <Row style={{minHeight: '85vh'}} gutter={16}>
          <Col lg={6}>
          
          </Col>
          <Col lg={18}>
            <Content style={{ padding: '0px 0px 0px 16px' }}>
              <Quoter />
            </Content>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Quotemaster