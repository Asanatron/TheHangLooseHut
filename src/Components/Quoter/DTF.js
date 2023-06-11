import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import Pink from '../../Media/pink.png'

const { Option } = Select;


var locationSizesOptions = [
  {
    label: 'Small Logo',
    value: 'Small Logo'
  },
  {
    label: 'Medium Logo',
    value: 'Medium Logo'
  }, 
  {
    label: 'Large Logo',
    value: 'Large Logo'
  },
];

export class DTF extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      itemCost: 0,
      location: 0,
      locationSizes: [],
      quantity: 0,
      totalCost: 0
    }
  }

  GetQuote(){
    var discount = 0

    if(this.state.quantity > 23 && this.state.quantity < 200){
      var temp = this.props.discount.find((data) => Number(data.From) <= this.state.quantity && this.state.quantity <= Number(data.To)).Discount
      discount = Number(temp.substring(0, temp.length-1))
    } else if(this.state.quantity >= 200){
      discount = 35
    } else{
      discount = 0
    }

    var logoCost = 0

    if(this.state.locationSizes.length == this.state.location && this.state.location !== 0){
      for(var i=0; i< this.state.location; i++){
        var value = this.props.meta.find((data) => data.Label === this.state.locationSizes[i].size).Value
        value = value.length === 2 ? value[1] : value.slice(1, value.length-1)
        logoCost += Number(value)
      }
    }

    var totalCost = this.state.itemCost !== 0 && this.state.locationSizes.length == this.state.location && this.state.quantity !== 0 && this.state.location !== 0 && this.props.meta && this.props.meta.length !== 0
              ? Number((Number(this.state.itemCost) + logoCost) * this.state.quantity * Number(this.props.meta.find((data) => data.Label == 'Markup').Value)*Number((100-discount)/100))
              : 0

    this.setState({
      totalCost: totalCost
    })

    this.props.getitemCost(this.state.itemCost)
    this.props.getlocationSizes(this.state.locationSizes)
    this.props.getquantity(this.state.quantity)
    this.props.gettotalCost(this.state.totalCost)
    this.props.getlocation(this.state.location)
  }

  updateSizes(e, i){
    var sizeArray = this.state.locationSizes
    if(sizeArray.find((data) => data.key == i) == undefined){
      sizeArray.push({key: i, size: e})
    } else {
      sizeArray = sizeArray.filter((data) => data.key !== i)
      sizeArray.push({key: i, size: e})
    }

    this.setState({
      locationSizes: sizeArray
    })
  }

  render() {
    const itemOptions = this.props.dtfItemList.length !== 0 ? this.props.dtfItemList.map((item, i) => (<Option key={i+1} value={item.label}>{item.label}</Option>)) : <></>

    var locationHTML = []
    for (let i = 1; i <= this.state.location; i++) {
      locationHTML.push(<div key={i+1}>
        <div className="pr2 pt3 font-prim-small">Size #{i}</div>
        <Select
          // defaultValue="Direct to "
          placeholder="Choose logo size"
          style={{ width: '100%' }}
          onChange={(e) => this.updateSizes(e,i)}
          options={locationSizesOptions}
        /> 
      </div>);
    }
    return (
      <div>
        <div className="pr2 pt3 font-prim-small">Item</div>
        <Select placeholder="Choose item"
            style={{ width: '100%' }}
            onChange={(e) => {this.setState({
              itemCost: Number(this.props.dtfItemList.find((data) => data.label === e).value)
            }); this.props.getitem(e)}}>
          {itemOptions}
        </Select>

        <div className="pr2 pt3 font-prim-small">Pieces</div>
          <Input
            className=""
            placeholder="Enter number of pieces for printing"
            onChange={(e) => {this.setState({ quantity: Number(e.target.value)});}}
            value={this.state.quantity}
          />  

        <div className="pr2 pt3 font-prim-small">Number of locations</div>
          <Input
            className=""
            placeholder="Enter number of locations for print"
            onChange={(e) => {this.setState({ location: Number(e.target.value) });}}
            value={this.state.location}
          />                    
        {locationHTML}
        <Row className='mt3' align='middle' justify='center' gutter={10}>
          <Col>
            <div className='b f4'>Total Cost : <span className='f3'>${Math.round(this.state.totalCost)}</span></div>
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

export default DTF