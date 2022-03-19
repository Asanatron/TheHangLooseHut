import React, { Component } from 'react'
import { Col, Divider, Row , Spin, Card, Input, Upload, message, Select} from 'antd';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import './upload.css'

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const { Meta } = Card;
const { Search } = Input;
const { Dragger } = Upload;
const { Option } = Select;

export class Submission extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }

  async componentDidMount(){
    var config = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/clients',
    };

    axios(config).then((res) => {
      this.setState({
        clients: res.data.clients.data
      })
    })
    .catch((error) => {
      console.log(error)
    });

    var config = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/categories',
    };

    axios(config).then((res) => {
      this.setState({
        categories: res.data.categories
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  }

  
  render() {
    console.log(this.state)
    return (
      <div className='upload mt3'>
        <Row justify='centre' className='dashboard-designs-header w-100 pr3 pl3'>
          <Col lg={3} className=''>Upload Design</Col>
          <Col lg={21}></Col>
          {/* <Col lg={4}><Search className='dashboard-designs-search-button' placeholder="input search text" onSearch={(e) => this.setState({search: e})} enterButton/></Col> */}
        </Row>
        <Divider />
        <Row justify='center'>
          <Col lg={11}>
          <Dragger action='http://localhost:8000/' name={'temp'} onChange={(e) =>this.onChange(e)} onDrop={(e) => this.onDrop(e)} multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Supported files: jpg, jpeg, png, pdf
            </p>
          </Dragger>
          </Col>
          <Col lg={11}>
          <Select placeholder="Select province">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Submission