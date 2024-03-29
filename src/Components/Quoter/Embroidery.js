import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import Pink from '../../Media/pink.png'

const { Option } = Select;

var logoSizes = [
  {
    label: '2-5 Inches',
    value: '2-5 Inches'
  },
  {
    label: '5.1-6.9 Inches',
    value: '5.1-6.9 Inches'
  }, 
  {
    label: '7-12 Inches',
    value: '7-12 Inches'
  },
];

export class Embroidery extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      quantity: 0, 
      totalCost: 0,
      ppCost: 0,
      itemCost: 0,
      logoCost: 0
    }
  }

  GetQuote(){
    var discount = 0

    if(this.state.quantity > 23){
      var temp = this.props.discount.find((data) => Number(data.From) <= this.state.quantity && this.state.quantity <= Number(data.To)).Discount
      discount = Number(temp)
    } else{
      discount = 0
    }

    if(this.props.meta && this.props.meta.length != 0){
      var totalCost = this.state.itemCost !== 0 && this.state.logoCost !== 0 && this.state.quantity !== 0 && this.props.meta && this.props.meta.length !== 0
              ? Number((this.state.itemCost + this.state.logoCost) * this.state.quantity * Number(this.props.meta.find((data) => data.Label == 'Markup').Value)*Number((100-discount)/100))
              : 0

      var ppCost = this.state.itemCost !== 0 && this.state.logoCost !== 0 && this.state.quantity !== 0 && this.props.meta && this.props.meta.length !== 0
              ? Number(Math.round(Number((this.state.itemCost + this.state.logoCost) * this.state.quantity * Number(this.props.meta.find((data) => data.Label == 'Markup').Value)*Number((100-discount)/100)))/this.state.quantity)
              : 0
      this.setState({
        totalCost: totalCost,
        ppCost: ppCost
      })

      this.props.gettotalCost(totalCost)
      this.props.getppCost(ppCost)
      this.props.getquantity(this.state.quantity)
      this.props.getitemCost(this.state.itemCost)
      this.props.getlogoCost(this.state.logoCost)
    }
  }

  render() {
    const itemOptions = this.props.embroideryItemList.length !== 0 ? this.props.embroideryItemList.map((item, i) => (<Option key={i+1} value={item.label}>{item.label}</Option>)) : <></>
    
    return (
      <div>
         <div className="pr2 pt3 font-prim-small">Item</div>
          <Select placeholder="Choose item"
            showSearch
              style={{ width: '100%' }}
              onChange={(e) => {
                this.setState({
                  itemCost: Number(this.props.embroideryItemList.find((data) => data.label === e).value)
                }); this.props.getitem(e)}
              }>
            {itemOptions}
          </Select>

        <div className="pr2 pt3 font-prim-small">Pieces</div>
          <Input
            className=""
            placeholder="Enter number of pieces for embroidery"
            onChange={(e) => this.setState({ quantity: Number(e.target.value) })}
            value={this.state.quantity}
          />  
        <div className="pr2 pt3 font-prim-small">Logo size</div>
          <Select
            placeholder="Choose logo size"
            style={{ width: '100%' }}
            onChange={(e) => {
              this.setState({
              logoCost: Number(this.props.meta.find((data) => data.Label == e).Value)
            }); this.props.getlogoSize(e)}}
            options={logoSizes}
          /> 
          <Row className='mt3' align='middle' justify='center' gutter={10}>
            <Col>
              <div className='b f4'>Total Cost : <span className='f3'>${Math.round(this.state.totalCost)}</span></div>
            </Col>
          </Row>
          <Row className='mt3 mb3' align='middle' justify='center' gutter={10}>
            <Col>
              <div className='b f4'>Per Piece Cost : <span className='f3'>${Math.ceil(Number(this.state.ppCost)*2)/2}</span></div>
            </Col>
          </Row>
          <Row justify="center mb3 pt3">
            <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.GetQuote()}}>
              <img className="button-logo" src={Pink}></img>Get Quote
            </Button> 
          </Row>
      </div>
    )
  }
}

export default Embroidery