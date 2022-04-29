import React, { Component } from 'react'
import { Layout, Row, Col, Input, Button, notification } from 'antd';
import Sidebar from './Components/Sidebar';
import Body from './Components/Body';
import Logo from './Media/Logo.png';
import './App.css';
import axios from "axios";

const { Sider } = Layout;

export class App extends Component {
  state = {
    collapsed: false,
    loginState: 'LoggedIn',
    username: '',
    password: ''
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  Login(){
    var configLogin = {
      method: "get",
      url: `https://thehangloosehutbackend.herokuapp.com/login?id=${this.state.username}&pwd=${this.state.password}`,
    };

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
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        {
          this.state.loginState === 'LoggedIn' ?
          <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Sidebar />
          </Sider>
          <Layout className="site-layout">
            <Body />
          </Layout>
        </Layout> :
        <div className='login-page'>
          <Row className='header' align='center'>
            <Col>
              <img alt='TheHangLooseHut' className='header-logo' src={Logo}/>
            </Col>
          </Row>
          <Row className='login-box' justify='bottom' align='center'>
            <Col className='f3 login-form'>
              {/* <div className='tc'>
                Login
              </div> */}
              <Input
                className=""
                placeholder="Enter username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <Input
                className=""
                placeholder="Enter password"
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
