import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import Pink from '../../Media/pink.png'

const { Option } = Select;

var locationColorOptions =[
  {
    label: '1 Color',
    value: '1 COLOR'
  }, {
    label: '2 Colors',
    value: '2 COLORS'
  }, {
    label: '3 Colors',
    value: '3 COLORS'
  }, {
    label: '4 Colors',
    value: '4 COLORS'
  }, {
    label: '5 Colors',
    value: '5 COLORS'
  },
]
export class Screenprint extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      itemCost: 0,
      quantity: 0,
      location: 0,
      locationColors: [],
      screens: 0,
      totalCost: 0
    }
  }

  updateColors(e, i){
    var colorArray = this.state.locationColors
    if(colorArray.find((data) => data.key == i) == undefined){
      colorArray.push({key: i, color: e})
    } else {
      colorArray = colorArray.filter((data) => data.key !== i)
      colorArray.push({key: i, color: e})
    }

    this.setState({
      locationColors: colorArray
    })
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

    if(this.state.locationColors.length == this.state.location && this.state.location !== 0){
      for(var i=0; i< this.state.location; i++){
        var value = this.props.meta.find((data) => data.Label === this.state.locationColors[i].color).Value
        value = value.length === 2 ? value[1] : value.slice(1, value.length-1)
        logoCost += Number(value)
      }
    }

    var totalCost = this.state.itemCost !== 0 && this.state.locationColors.length == this.state.location && this.state.quantity !== 0 && this.state.location !== 0 && this.props.meta && this.props.meta.length !== 0
              ? Number((Number(this.state.itemCost) + logoCost) * this.state.quantity * Number(this.props.meta.find((data) => data.Label == 'Markup').Value)*Number((100-discount)/100)*this.state.screens)
              : 0

    this.setState({
      totalCost: totalCost
    })

    this.props.getitemCost(this.state.itemCost)
    this.props.getlocationColors(this.state.locationColors)
    this.props.getquantity(this.state.quantity)
    this.props.gettotalCost(totalCost)
    this.props.getlocation(this.state.location)
    this.props.getscreens(this.state.screens)
  }

  render() {

    const itemOptions = this.props.screenPrintItemList.length !== 0 ? this.props.screenPrintItemList.map((item, i) => (<Option key={i+1} value={item.label}>{item.label}</Option>)) : <></>

    var locationHTML = []
    for (let i = 1; i <= this.state.location; i++) {
      locationHTML.push(<div key={i+1}>
        <div className="pr2 pt3 font-prim-small">Location #{i}</div>
        <Select
          // defaultValue="Direct to "
          placeholder="Choose logo color"
          style={{ width: '100%' }}
          onChange={(e) => this.updateColors(e,i)}
          options={locationColorOptions}
        /> 
      </div>);
    }

    return (
      <div>
        <div className="pr2 pt3 font-prim-small">Item</div>
        <Select placeholder="Choose item"
            style={{ width: '100%' }}
            onChange={(e) => {this.setState({
              itemCost: Number(this.props.screenPrintItemList.find((data) => data.label === e).value)
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

        <div className="pr2 pt3 font-prim-small">Screens</div>
          <Input
            className=""
            placeholder="Enter number of screens for printing"
            onChange={(e) => {this.setState({ screens: Number(e.target.value)});}}
            value={this.state.screens}
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

export default Screenprint