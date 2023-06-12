import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import { LoadingOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Pink from '../../Media/pink.png'
import ReactToPrint from 'react-to-print';
import Receipt from './Receipt';

const { Dragger } = Upload;

export class CusDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cusName: '',
      sorority: '',
      school: '',
      contactInfo: '',
      image: null,
      files: null,
      FILEBASE64URI: null,
      imageName: "",
    }
  }

  PrintQuote(){
      
  }


  render() {
    const props = {
      name: "file",
      multiple: false,
      fileList: [],
      onRemove: (file) => {
        this.setState({
          fileList: null,
          FILEBASE64URI: null,
          image: null,
        });
      },
      beforeUpload: (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result,
            file: file,
          };

          this.setState({
            files: file,
            imageName: fileInfo.name,
            FILEBASE64URI: fileInfo.base64,
            image: fileInfo.type === 'image/png' ? fileInfo.base64.slice(22) : fileInfo.base64.slice(23)
          });
        };
        return false;
      },
    };

    console.log(this.props)

    return (
      <div className='pl3'>
        <Row justify="centre" className=" pt1 dashboard-designs-header w-100 pr3">
          <Col className="f4 font-prim-big">
            Customer Details
          </Col>
        </Row>

        <Divider />

        <div className="pl2 pr2 pt2 font-prim-small">Customer Name</div>
        <Input
          className=""
          placeholder="Enter Customer Name"
          onChange={(e) => this.setState({ cusName: e.target.value })}
          value={this.state.cusName}
        />

<       div className="pl2 pr2 pt2 font-prim-small">Sorority Name</div>
        <Input
          className=""
          placeholder="Enter Sorority Name"
          onChange={(e) => this.setState({ sorority: e.target.value })}
          value={this.state.sorority}
        />

        <div className="pl2 pr2 pt2 font-prim-small">School Name</div>
        <Input
          className=""
          placeholder="Enter School Name"
          onChange={(e) => this.setState({ school: e.target.value })}
          value={this.state.school}
        />

        <div className="pl2 pr2 pt2 font-prim-small">Contact Info</div>
        <Input
          className="mb3"
          placeholder="Enter Contact Information"
          onChange={(e) => this.setState({ contactInfo: e.target.value })}
          value={this.state.contactInfo}
        />  

        <br />
        <br />

        <Dragger className='mt3' {...props}>
          {this.state.FILEBASE64URI && (
            <img alt='design to be uploaded' src={this.state.FILEBASE64URI} width={"500px"} />
          )}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Upload design inspiration
          </p>
          <p className="ant-upload-hint">
            Supported files: jpg, jpeg and png only
          </p>
        </Dragger>

        <ReactToPrint
          trigger={() => {
            return <Row justify="center mb3 pt3">
            <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.PrintQuote()}}>
              <img className="button-logo" src={Pink}></img>Print Quote
            </Button> 
          </Row>;
          }}
          content={() => this.componentRef}
        />
          <div style={{ display: "none" }}>
          <Receipt 
            printType = {this.props.printType}
            totalCost = {this.props.totalCost}
            quantity = {this.props.quantity}
            itemCost = {this.props.itemCost}
            logoCost = {this.props.logoCost}
            locationSizes = {this.props.locationSizes}
            locationColors = {this.props.locationColors}
            screens = {this.props.screens}
            location = {this.props.location}
            item = {this.props.item}
            cusName = {this.state.cusName}
            sorority = {this.state.sorority}
            school = {this.state.school}
            contactInfo = {this.state.contactInfo}
            image = {this.state.image}
            FILEBASE64URI = {this.state.FILEBASE64URI}
            files = {this.state.files}
            imageName = {this.state.imageName}
            logoSize = {this.props.logoSize}
            ref={el => (this.componentRef = el)} 
          />
          </div>
      </div>
    )
  }
}

export default CusDetails