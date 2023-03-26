import React, { Component } from 'react';
import './content.css';
import { Layout, Row, Col, Spin, Divider, Button} from 'antd';
import HLHLogoText from '../../Media/HLHLogoText.png'
import HLHLogo from '../../Media/hlhlogo.png'
import { Routes, Route } from 'react-router-dom';
import Upload from '../Upload';
import axios from 'axios';
import { VictoryPie, VictoryLegend } from 'victory';
import { LoadingOutlined } from '@ant-design/icons';
import './content.css'

const { Content, Footer } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

export class Body extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      designs: null,
      taskDataOld: [],
      taskDataNew: [],
      Fetched: false,
      Logistics: 1
    }
  }

  async componentDidMount(){
    var sectionDataOld = []
    var sectionDataNew = []

    var ReviewConfig = {
      method: 'get',
      url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1202401225268634`,
      headers: {}
    };

    axios(ReviewConfig).then((res) => {
      sectionDataOld.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})

      var UploadedConfig = {
        method: 'get',
        url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1202401225268638`,
        headers: {}
      };
      
      axios(UploadedConfig).then((res) => {
        sectionDataOld.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})
  
        var ApprovedConfig = {
          method: 'get',
          url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1202401225268637`,
          headers: {}
        };

        axios(ApprovedConfig).then((res) => {
          sectionDataOld.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})
          this.setState({
            Fetched: true
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })

    var ReviewConfig = {
      method: 'get',
      url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1203923992086451`,
      headers: {}
    };

    axios(ReviewConfig).then((res) => {
      sectionDataNew.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})

      var UploadedConfig = {
        method: 'get',
        url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1202401225268638`,
        headers: {}
      };
      
      axios(UploadedConfig).then((res) => {
        sectionDataNew.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})
  
        var ApprovedConfig = {
          method: 'get',
          url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=1204085369322326`,
          headers: {}
        };

        axios(ApprovedConfig).then((res) => {
          sectionDataNew.push({x: Math.round(res.data.tasks.data.length, 0), y: Math.round(res.data.tasks.data.length, 0)})
          this.setState({
            Fetched: true
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })

    this.setState({
      taskDataOld: sectionDataOld,
      taskDataNew: sectionDataNew
    })
  }
  
  render() {
    return (
      <Layout className='content-background'>
        <Row className='header' align='center'>
          <Col>
            <img alt='TheHangLooseHut' className='header-logo' src={HLHLogo}/><img alt='TheHangLooseHut' className='header-logo-text' src={HLHLogoText}/>
          </Col>
        </Row>
        <Row style={{minHeight: '85vh'}} gutter={16}>
          <Col lg={6}>
          {
            !this.state.Fetched ?
            <Row className='w-100 ma3' justify='center'>
              <Col lg={2}><Spin indicator={antIcon} className=''/></Col>
            </Row> :
            <div className='asana ma3'>
              <Row>
                <Col className='font-prim-big'>
                  Asana Metrics
                  <Divider />
                </Col>
              </Row>
              <Row justify="center mb3 pt3" gutter={4}>
                <Col lg={12}><Button className='font-sec-small' style={{minWidth: '32px', width: '100%'}} type="primary" onClick={() => {this.setState({Logistics: 1})}}>Hang Loose</Button></Col>
                <Col lg={12}><Button style={{minWidth: '32px', width: '100%'}} type="primary" onClick={() => {this.setState({Logistics: 2})}}>New Marketing</Button></Col>
              </Row>
              {
                this.state.Logistics === 1 ? 
                <div>
                  <Row>
                    <Col>
                      <VictoryPie 
                        data={this.state.taskDataOld}
                        animate={{
                          duration: 2000
                        }}
                        colorScale={["#E48EC3", "#7FC9EF", "#FAD447",]}
                        style={{
                          data: {
                            stroke: "black", strokeWidth: 0.2
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <VictoryLegend x={125} y={50}
                        title="Legend"
                        centerTitle
                        orientation="vertical"
                        gutter={20}
                        style={{title: {fontSize: 26 }, labels: {fontSize: 20}}}
                        data={[
                          { name: "Customer Review", symbol: { fill: "#E48EC3"}},
                          { name: "Approved From Affinity", symbol: { fill: "#7FC9EF" } },
                          { name: "Uploaded to Affinity", symbol: { fill: "#FAD447" } }
                        ]}
                      />
                    </Col>
                  </Row>
                </div> : 
                <div>
                  <Row>
                    <Col>
                      <VictoryPie 
                        data={this.state.taskDataNew}
                        animate={{
                          duration: 2000
                        }}
                        colorScale={["#E48EC3", "#7FC9EF", "#FAD447",]}
                        style={{
                          data: {
                            stroke: "black", strokeWidth: 0.2
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <VictoryLegend x={125} y={50}
                        title="Legend"
                        centerTitle
                        orientation="vertical"
                        gutter={20}
                        style={{title: {fontSize: 26 }, labels: {fontSize: 20}}}
                        data={[
                          { name: "Needs revision", symbol: { fill: "#E48EC3"}},
                          { name: "Needs final approval", symbol: { fill: "#7FC9EF" } },
                          { name: "Pending affinity", symbol: { fill: "#FAD447" } }
                        ]}
                      />
                    </Col>
                  </Row>
                </div>
              }
            </div>
          }
          </Col>
          <Col lg={18}>
            <Content style={{ padding: '0px 0px 0px 16px' }}>
            <Routes>
              <Route exact path='/TheHangLooseHut/' element={<Upload />} />
            </Routes>
            </Content>
          </Col>
        </Row>        
        <Footer className='footer' style={{ textAlign: 'center' }}>© THE HANG LOOSE HUT 2023</Footer>
      </Layout>
    )
  }
}

export default Body