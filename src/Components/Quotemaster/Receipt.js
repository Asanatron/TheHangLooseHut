import React, { Component } from 'react'
import { Layout, Row, Col, Input, Button, notification, Image, Divider } from 'antd';
import HLHLogoText from '../../Media/HLHLogoText.png'
import HLHLogo from '../../Media/hlhlogo.png'
import './receipt.css'

export class Receipt extends React.PureComponent {
  render() {
    return (
      <div className='ma4 printer hl-normal'>
        <Row className='header ba bw1 mb2' align='center'>
          <Col>
          <img alt='TheHangLooseHut' className='header-logo' src={HLHLogo}/><img alt='TheHangLooseHut' className='header-logo-text' src={HLHLogoText}/>
          </Col>
        </Row>
        <Row gutter={10} className='customer-box pa2'>
          <Col lg={12} className='pt1 pb1'>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>CUSTOMER NAME: </span><span className='f5'>{this.props.cusName.toUpperCase()}</span></div>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>SORORITY: </span><span className='f5'>{this.props.sorority.toUpperCase()}</span></div></Col>
          <Col lg={12} className='pt1 pb1'>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>SCHOOL: </span><span className='f5'>{this.props.school.toUpperCase()}</span></div>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>CONTACT INFORMATION:  </span><span className='f5'>{this.props.contactInfo.toUpperCase()}</span></div>
        </Col>
        </Row>
        <Row gutter={10} className='mt2 pa2'>
          <Col lg={12} className='pt1 pb1'>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>INSPIRATION DESIGN </span><span className='f5'></span></div>
            <Image className='mt1 border-dotted-all' src={this.props.FILEBASE64URI}/></Col>
          <Col lg={12} className='pt1 pb1'>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>PRINT TYPE: </span><span className='f5'>{this.props.printType.toUpperCase()}</span></div>
            <div className='f5 mb2 pl1 pr1 pt1 pb1 customer-box'><span className='b'>ITEM: </span><span className='f5'>{this.props.item.toUpperCase()}</span></div>
            <div className='f5 mb2 pl1 pr1 pt1 pb1'><span className='b'>QUANTITY: </span><span className='f5'>{this.props.quantity}</span></div>
            <div className='border-dotted'>
              <div className='f5 b customer-box pl1 pr1 pt1'>PRICE PER PIECE</div>
              <div className='f5 customer-box pl1 pr1 pb1'>${Math.ceil(Number(this.props.ppCost)*2)/2}</div>
              <div className='f4 b pl1 pr1 pt1'>TOTAL COST</div>
              <div className='f4 pl1 pr1 pb1'>${Math.round(Number(this.props.totalCost))}</div>
            </div>
        </Col>
        {/* <Row>
          <Col>
            <div>Thanks you</div>
            <div>for hangin'</div>
            <div>with us!</div>
          </Col>
        </Row> */}
        </Row>
        {/* <Row gutter={10}>
          <Col lg={2}></Col>
          <Col lg={10}>
            
            
            
          </Col>
          <Col lg={10}>
            <div className='f5 mb2'><span className='b'>Print Type: </span><span className='f5'>{this.props.printType}</span></div>
            <div className='f5 mb2'><span className='b'>Item: </span><span className='f5'>{this.props.item}</span></div>
            <div className='f5 mb2'><span className='b'>Quantity: </span><span className='f5'>{this.props.quantity}</span></div>
            {
              this.props.printType === 'dtf'
              ? <div>
                <div className='f5 mb2'><span className='b'>Location: </span><span className='f5'>{this.props.location}</span></div>
                {
                  this.props.locationSizes.map((location, i) => {
                    return(<div className='f5 mb2'><span className='b'>Location Size #{i}: </span><span className='f5'>{location.size}</span></div>)
                  })
                }
              </div>
              : this.props.printType === 'screenprint' 
              ? <div>
                <div className='f5 mb2'><span className='b'>Screens: </span><span className='f5'>{this.props.screens}</span></div>
                <div className='f5 mb2'><span className='b'>Location: </span><span className='f5'>{this.props.location}</span></div>
                {
                  this.props.locationColors.map((location, i) => {
                    return(<div className='f5 mb2'><span className='b'>Location Colors #{i}: </span><span className='f5'>{location.color}</span></div>)
                  })
                }
              </div>
              : <div>
                <div className='f5 mb2'><span className='b'>Logo Size: </span><span className='f5'>{this.props.logoSize}</span></div>
              </div>
            }
          </Col>
          <Col lg={2}></Col>
        </Row>
        <Divider className='mt2 mb2' />
        <Row className='mt3 mb3' gutter={16}>
          <Col lg={2}></Col>
          <Col lg={10}>
            <div className='f5 b'>Inspiration Design</div>
            <Image className='mt3' src={this.props.FILEBASE64URI}/>
          </Col>
          <Col lg={10}>
            <div className='f5 b'>Total cost</div>
            <div className='f3'>${Math.round(Number(this.props.totalCost))}</div>
          </Col>
          <Col lg={2}></Col>
        </Row>
        <Row >
        </Row> */}
      </div>
    )
  }
}

export default Receipt