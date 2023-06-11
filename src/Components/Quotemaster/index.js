import React, { Component } from 'react'
import { Layout, Row, Col, Spin, Divider, Button} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Quoter from '../Quoter';
import CusDetails from './CusDetails';

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export class Quotemaster extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      printType: '',
      totalCost: 0,
      quantity: 0, 
      itemCost: 0,
      logoCost: 0,
      location: 0,
      locationSizes: [],
      locationColors: [],
      screens: 0,
      item: ''
    }

    this.getprintType = this.getprintType.bind(this);
    this.gettotalCost = this.gettotalCost.bind(this);
    this.getquantity = this.getquantity.bind(this);
    this.getitemCost = this.getitemCost.bind(this);
    this.getlogoCost = this.getlogoCost.bind(this);
    this.getlocationSizes = this.getlocationSizes.bind(this);
    this.getlocationColors = this.getlocationColors.bind(this);
    this.getscreens = this.getscreens.bind(this);
    this.getlocation = this.getlocation.bind(this);
    this.getitem = this.getitem.bind(this);
  }

  getitem(e){
    this.setState({
      item: e
    })
  }

  getprintType(e){
    this.setState({
      printType: e
    })
  }

  gettotalCost(e){
    this.setState({
      totalCost: e
    })
  }

  getquantity(e){
    this.setState({
      quantity: e
    })
  }

  getitemCost(e){
    this.setState({
      itemCost: e
    })
  }

  getlogoCost(e){
    this.setState({
      logoCost: e
    })
  }

  getlocation(e){
    this.setState({
      location: e
    })
  }

  getlocationSizes(e){
    this.setState({
      locationSizes: e
    })
  }

  getlocationColors(e){
    this.setState({
      locationColors: e
    })
  }

  getscreens(e){
    this.setState({
      screens: e
    })
  }


  render() {
    return (
      <div>
        <Row style={{minHeight: '85vh'}} gutter={16}>
          <Col lg={6} className='pt3 mt2'>
            <CusDetails 
              printType = {this.state.printType}
              totalCost = {this.state.totalCost}
              quantity = {this.state.quantity}
              itemCost = {this.state.itemCost}
              logoCost = {this.state.logoCost}
              locationSizes = {this.state.locationSizes}
              locationColors = {this.state.locationColors}
              screens = {this.state.screens}
              location = {this.state.location}
              item = {this.state.item}
            />
          </Col>
          <Col lg={18}>
            <Content style={{ padding: '0px 0px 0px 16px' }}>
              <Quoter 
                getprintType = {this.getprintType}
                gettotalCost = {this.gettotalCost}
                getquantity = {this.getquantity}
                getitemCost = {this.getitemCost}
                getlogoCost = {this.getlogoCost}
                getlocationSizes = {this.getlocationSizes}
                getlocationColors = {this.getlocationColors}
                getscreens = {this.getscreens}
                getlocation = {this.getlocation}
                getitem = {this.getitem}
              />
            </Content>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Quotemaster