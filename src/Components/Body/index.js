import React, { Component } from 'react';
import './content.css';
import { Layout, Row, Col, Card, Spin, Divider} from 'antd';
import Logo from '../../Media/Logo.png'
import { Routes, Route } from 'react-router-dom';
import Upload from '../Upload';
import axios from 'axios';
import { VictoryPie, VictoryLegend } from 'victory';
import { LoadingOutlined } from '@ant-design/icons';
import './content.css'

const { Content, Footer } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

const sections = [ {gid: '1201675561988415', name: 'Untitled section', resource_type: 'section'},
{gid: '1202110923593137', name: 'Order Form Inquiry', resource_type: 'section'},
{gid: '1201697191761872', name: 'GENERAL', resource_type: 'section'},
{gid: '1201676388962279', name: 'CHECK AFFINITY', resource_type: 'section'},
{gid: '1201681956608998', name: 'Pending approval after affinity', resource_type: 'section'},
{gid: '1201713389856031', name: 'FEEDBACK', resource_type: 'section'},
{gid: '1202204681516958', name: 'Approved From Affinity', resource_type: 'section'},
{gid: '1202204681516963', name: 'Rejected From Affinity', resource_type: 'section'},
{gid: '1202204681516966', name: 'Uploaded to Affinity', resource_type: 'section'},
{gid: '1202204681516973', name: 'Customer Review', resource_type: 'section'}];

export class Body extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      designs: null,
      pageNum: 1,
      taskData: []
    }
  }

  async componentDidMount(){
    var sectionData = [];

    sections.forEach(section => {
      var configTasks= {
        method: 'get',
        url: `https://thehangloosehutbackend.herokuapp.com/fetchtasks?gid=${section.gid}`,
        headers: {}
      };

      axios(configTasks).then((res) => {
        sectionData.push({x: res.data.tasks.data.length, y: res.data.tasks.data.length})
      })
      .catch((error) => {
        console.log(error)
      })
    })

    this.setState({
      taskData: sectionData
    })
  }
  
  render() {
    return (
      <Layout className='content-background'>
        <Row className='header' align='center'>
          <Col>
            <img alt='TheHangLooseHut' className='header-logo' src={Logo}/>
          </Col>
        </Row>
        <Row style={{minHeight: '85vh'}} gutter={16}>
          <Col lg={6}>
          {
            this.state.taskData.length >= 6 ?
            <Row className='w-100' justify='center'>
              <Col lg={2}><Spin indicator={antIcon} className='dashboard-designs-spin'/></Col>
            </Row> :
            <div className='asana ma3'>
              <Row>
                <Col className='f4'>
                  Asana Logistics
                  <Divider />
                </Col>
              </Row>
              <Row>
                <Col>
                  <VictoryPie 
                    data={this.state.taskData}
                    animate={{
                      duration: 2000
                    }}
                    colorScale={["#262626", "#454444", "#636363", "#737373", "#878787", "#999999" ]}
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
                    style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
                    data={[
                      { name: "Untitled section", symbol: { fill: "#262626"} },
                      { name: "Order Form Inquiry", symbol: { fill: "#454444" } },
                      { name: "GENERAL", symbol: { fill: "#636363" } },
                      { name: "CHECK AFFINITY", symbol: { fill: "#737373"} },
                      { name: 'Pending approval after affinity', symbol: { fill: "#878787" } },
                      { name: "FEEDBACK", symbol: { fill: "#999999" } }
                    ]}
                  />
                </Col>
              </Row>
            </div>
          }
          </Col>
          <Col lg={18}>
            <Content style={{ padding: '0px 0px 0px 16px' }}>
            <Routes>
              <Route exact path='/TheHangLooseHut/' element={<Upload />} />
              {/* <Route exact path='/status' element={<Status />} /> */}
              {/* <Route exact path='/TheHangLooseHut/upload' element={<Upload />} /> */}
            </Routes>
            </Content>
          </Col>
        </Row>        
        <Footer className='footer' style={{ textAlign: 'center' }}>© THE HANG LOOSE HUT 2022</Footer>
      </Layout>
    )
  }
}

export default Body