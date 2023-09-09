import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import { LoadingOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Pink from '../../Media/pink.png'
import ReactToPrint from 'react-to-print';
import Receipt from './Receipt';

const { Dragger } = Upload;
const { Option } = Select;

export class CusDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cusName: '',
      sororityList: [],
      schoolList: [],
      sorority: '',
      school: '',
      sororityOthers: '',
      schoolOthers: '',
      contactInfo: '',
      image: null,
      files: null,
      FILEBASE64URI: null,
      imageName: "",
    }
  }

  PrintQuote(){
      if(this.state.school === 'Others' && this.state.schoolOthers !== ''){
        var insertSchool = {
          method: 'post',
          url: `https://thehangloosehutbackend.herokuapp.com/insertSchool?newValue=${this.state.schoolOthers}`,
          headers: {}
        }
  
        axios(insertSchool).then((res) => {
          notification.success({
            message: `School List Updated`,
            placement: "bottomRight",
          });
          this.setState({
            school: ''
          })
        })
      }

      if(this.state.sorority === 'Others' && this.state.sororityOthers !== ''){
        var insertSchool = {
          method: 'post',
          url: `https://thehangloosehutbackend.herokuapp.com/insertSorority?newValue=${this.state.sororityOthers}`,
          headers: {}
        }
  
        axios(insertSchool).then((res) => {
          notification.success({
            message: `Sorority List Updated`,
            placement: "bottomRight",
          });
          this.setState({
            sorority: ''
          })
        })
      }
  }

  componentDidMount(){
    var GetTableData_schools = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=schools',
      headers: {}
    }

    axios(GetTableData_schools).then((res) => {
      // console.log(res.data.solution)
      this.setState({
        schoolList: res.data.solution
      })

      var GetTableData_sorority = {
        method: 'get',
        url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=sorority',
        headers: {}
      }
  
      axios(GetTableData_sorority).then((res) => {
        // console.log(res.data.solution)
        this.setState({
          sororityList: res.data.solution
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }


  render() {
    const schoolOptions = this.state.schoolList.length !== 0 ? this.state.schoolList.map((item, i) => (<Option key={i+1} value={item.School_Name}>{item.School_Name}</Option>)) : <></>
    const sororityOptions = this.state.sororityList.length !== 0 ? this.state.sororityList.map((item, i) => (<Option key={i+1} value={item.Sorority_name}>{item.Sorority_name}</Option>)) : <></>


    // console.log(this.state)
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

    // console.log(this.props)

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

      <div className="pl2 pr2 pt2 font-prim-small">School Name</div>
        <Select placeholder="Choose school"
            showSearch
            style={{ width: '100%' }}
            onChange={(e) => {this.setState({
              school: e
            })}}>
          {schoolOptions}
        </Select>

        {
          this.state.school === 'Others' ? <div className='mt3'>
            <Input
              className=""
              placeholder="Enter School Name"
              onChange={(e) => this.setState({ schoolOthers: e.target.value })}
              value={this.state.schoolOthers}
            />
          </div> : <div>
          </div>
        }

        <div className="pl2 pr2 pt2 font-prim-small">Sorority Name</div>
        <Select placeholder="Choose sorority"
            showSearch
            style={{ width: '100%' }}
            onChange={(e) => {this.setState({
              sorority: e
            })}}>
          {sororityOptions}
        </Select>

        {
          this.state.sorority === 'Others' ? <div className='mt3'>
            <Input
              className=""
              placeholder="Enter Sorority Name"
              onChange={(e) => this.setState({ sororityOthers: e.target.value })}
              value={this.state.sororityOthers}
            />
          </div> : <div>
          </div>
        }

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
          onBeforePrint={() => this.PrintQuote()}
          trigger={() => {
            return <Row justify="center mb3 pt3">
            <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {}}>
              <img className="button-logo" src={Pink}></img>Print Quote
            </Button> 
          </Row>;
          }}
          removeAfterPrint={false}
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