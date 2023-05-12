import React, { Component } from 'react';
import './content.css';
import { Layout, Row, Col} from 'antd';
import HLHLogoText from '../../Media/HLHLogoText.png'
import HLHLogo from '../../Media/hlhlogo.png'
import './content.css'
import Asanatron from '../Asanatron';
import Quotemaster from '../Quotemaster';

const { Content, Footer } = Layout;

export class Body extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }

  componentDidMount(){
    
  }
  
  render() {
  
    return (
      <Layout className='content-background'>
        <Row className='header' align='center' justify='middle'>
          <Col>
            <img alt='TheHangLooseHut' className='header-logo' src={HLHLogo}/><img alt='TheHangLooseHut' className='header-logo-text' src={HLHLogoText}/>
            <span className='logo-ext'> <span className='f3'>x</span> {this.props.userType}</span>
          </Col>
        </Row>
        <Content>
          {
          this.props.userType === 'asanatron' ? 
            <Asanatron /> : 
              this.props.userType === 'quotemaster' ?
                <Quotemaster /> : 
                this.props.userType === 'quotemaster' ?
                  <div>Admin</div> :
                    <div>Bad path</div>
            } 
        </Content>    
        <Footer className='footer' style={{ textAlign: 'center' }}>© THE HANG LOOSE HUT 2023</Footer>
      </Layout>
    )
  }
}

export default Body