import React, { Component } from 'react'
import { Layout, Row, Col, Input, Button, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Body from './Components/Body';
import Logo from './Media/Logo.png';
import './App.css';
import axios from "axios";

export class App extends Component {
  state = {
    loginState: 'LoggedIn',
    username: '',
    password: ''
  };

  Login(){
    var configLogin = {
      method: "get",
      url: `http://localhost:8080/login?id=${this.state.username}&pwd=${this.state.password}`,
    };

    if(this.state.password !== '' && this.state.username !== ''){
      axios(configLogin)
      .then((res) => {
        if(res.data === true){
          this.setState({
            loginState: 'LoggedIn'
          })
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

  render() {
    return (
      <div>
        {
          this.state.loginState === 'LoggedIn' ?
          <Layout className="site-layout">
            <Body />
          </Layout>:
        <div className='login-page'>
          <Row className='header' align='center'>
            <Col>
              <img alt='TheHangLooseHut' className='header-logo' src={Logo}/>
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
