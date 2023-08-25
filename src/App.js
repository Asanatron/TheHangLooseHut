import React, { Component } from 'react'
import { Layout, Row, Col, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Body from './Components/Body';
import HLHLogoText from './Media/HLHLogoText.png'
import HLHLogo from './Media/hlhlogo.png'
import './App.css';
import axios from "axios";
import CryptoJS from 'crypto-js';


export class App extends Component {
  state = {
    loginState: 'LoggedOut',
    username: '',
    password: '',
    userType: ''
  };

  Login(){
    var configLogin = {
      method: "get",
      url: `https://thehangloosehutbackend.herokuapp.com/login?id=${this.state.username}&pwd=${this.state.password}`,
    };

    if(this.state.password !== '' && this.state.username !== ''){
      axios(configLogin)
      .then((res) => {
        console.log(res.data)
        if(res.data.status === true){
          this.setState({
            loginState: 'LoggedIn',
            userType: res.data.userType
          })
          const encryptedUserType  = CryptoJS.AES.encrypt(
          res.data.userType,
          process.env.REACT_APP_HASH_SECRET
          ).toString();
          localStorage.setItem('userType', encryptedUserType );
        } else{
          notification.error({
            message: `Incorrect username or Password`,
            placement: "bottomRight",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else{
      notification.error({
        message: `Enter Username and Password`,
        placement: "bottomRight",
      });
    }
  }
  
  componentDidMount(){
    const userType=localStorage.getItem('userType');
    if(userType){

      const bytes = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(userType, process.env.REACT_APP_HASH_SECRET));
      const decryptedUserType = bytes.toString();
      if(decryptedUserType=="admin" || decryptedUserType == 'asanatron' || decryptedUserType == 'quotemaster'){
        this.setState({
          loginState: 'LoggedIn',
          userType: decryptedUserType
        });
      }
    }
  }

  render() {
  
    return (
      <div>
        {
          this.state.loginState === 'LoggedIn' ?
          <Layout className="site-layout">
            <Body userType={this.state.userType}/>
          </Layout>:
        <div className='login-page'>
          <Row className='header' align='center'>
            <Col>
            <img alt='TheHangLooseHut' className='header-logo' src={HLHLogo}/><img alt='TheHangLooseHut' className='header-logo-text' src={HLHLogoText}/>
            </Col>
          </Row>
          <Row className='login-box' justify='bottom' align='center'>
            <Col className='f3 login-form'>
              <Input
                className=""
                placeholder="Enter Username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <Input.Password
                placeholder="Enter Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <Row justify='middle' align='center' className='mt3'>
                <Button
                  className=""
                  type="primary"
                  onClick={() => {
                    this.Login();
                  }}
                >
                  Login
                </Button>
              </Row>
            </Col>
          </Row>
         
        </div>
        }
      </div>
    )
  }
}

export default App;
