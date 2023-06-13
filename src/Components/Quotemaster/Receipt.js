import React, { Component } from 'react'
import { Layout, Row, Col, Input, Button, notification, Image, Divider } from 'antd';
import HLHLogoText from '../../Media/HLHLogoText.png'
import HLHLogo from '../../Media/hlhlogo.png'
import './receipt.css'

export class Receipt extends React.PureComponent {
  render() {
    return (
      <div className='ma4'>
        <Row className='header ba bw1 mb2' align='center'>
          <Col>
          <img alt='TheHangLooseHut' className='header-logo' src={HLHLogo}/><img alt='TheHangLooseHut' className='header-logo-text' src={HLHLogoText}/>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col lg={2}></Col>
          <Col lg={10}>
            <div className='f5 mb2'><span className='b'>Customer Name: </span><span className='f5'>{this.props.cusName}</span></div>
            <div className='f5 mb2'><span className='b'>Sorority: </span><span className='f5'>{this.props.sorority}</span></div>
            <div className='f5 mb2'><span className='b'>School: </span><span className='f5'>{this.props.school}</span></div>
            <div className='f5 mb2'><span className='b'>Contact Information:  </span><span className='f5'>{this.props.contactInfo}</span></div>
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
            
        </Row>
      </div>
    )
  }
}

export default Receipt