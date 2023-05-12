import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import Pink from '../../Media/pink.png'

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const SmallantIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Option } = Select;


export class Quoter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  render() {
    return (
      <div className="upload mt3 mb3">
        <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3">
          <Col lg={4} className="f4 font-prim-big">
            Get Quote
          </Col>
          <Col lg={20}></Col>
        </Row>
        <Divider />
        <Row justify="center" gutter={16} className="mb3">
          <Col lg={11}>
            
          </Col>
          <Col lg={11}>
            <div className="pl2 pr2 pt2 font-prim-small">Title</div>
            <Input
              className=""
              placeholder="Enter design title"
              onChange={(e) => this.setState({ title: e.target.value })}
              value={this.state.title}
            />
            <div className="pl2 pr2 pt2 font-prim-small">Task Link</div>
            <Input
              className=""
              placeholder="Enter design link"
              onChange={(e) => this.setState({ desc: e.target.value })}
              value={this.state.desc}
            />
            <div className="pl2 pr2 pt2 font-prim-small">Primary Licensor</div>
            <Select
              defaultOpen=""
              onChange={(e) => {
                this.setState({ clientID: e });
              }}
              className="w-100"
              placeholder="Select province"
              value={this.state.clientID}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {this.state.clients ? (
                this.state.clients.map((client, index) => {
                  return (
                    <Option key={index} value={client.id}>
                      {client.name}
                    </Option>
                  );
                })
              ) : (
                <Option value={0}>
                  <Row className="w-100" justify="center">
                    <Col lg={2}>
                      <Spin
                        indicator={antIcon}
                        className=""
                      />
                    </Col>
                  </Row>
                </Option>
              )}
            </Select>
            <div className="pl2 pr2 pt2 font-prim-small">Category</div>
            <Select
              defaultOpen=""
              onChange={(e) => {
                this.setState({ category: e });
              }}
              className="w-100"
              placeholder="Select province"
              value={this.state.category}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {this.state.treeData ? (
                this.state.treeData.map((category, index) => {
                  return (
                    <Option key={index} value={category.id}>
                      {category.name}
                    </Option>
                  );
                })
              ) : (
                <Option value={0}>
                  <Row className="w-100" justify="center">
                    <Col lg={2}>
                      <Spin
                        indicator={antIcon}
                        className=""
                      />
                    </Col>
                  </Row>
                </Option>
              )}
            </Select> 
            <div className="pl2 pr2 pt2 font-prim-small">Expedite</div>
            <Radio.Group className="tc" onChange={(e) => {this.setState({is_expedited: e.target.value})}} value={this.state.is_expedited}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row justify="center mb3 pt3">
          {
            this.state.uploading === false 
            ? <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.onPost()}}>
              <img className="button-logo" src={Pink}></img>Upload to Affinity
            </Button> 
            : <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.onPost()}}>
            <Spin indicator={SmallantIcon} className='dashboard-designs-spin'/>
          </Button> 
          }
          
        </Row>
      </div>
    )
  }
}

export default Quoter