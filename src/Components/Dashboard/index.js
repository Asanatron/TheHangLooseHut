import React, { Component } from 'react'
import axios from 'axios';
import { Col, Row, Divider, Spin, Card, Pagination} from 'antd';
import { VictoryPie, VictoryLegend } from 'victory';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const { Meta } = Card;

const designPhases = new Map([
  ['On Hold', 'yellow'],
  ['Pending Licensor Review', 'yellow'],
  ['Pending Admin Review', 'yellow'],
  ['Rejected By Licensor', 'red'],
  ['Rejected By Admin', 'red'],
  ['Final Rejected By Admin', 'red'],
  ['Approved By Admin With Changes', 'green'],
  ['Approved By Licensor With Changes', 'green'],
  ['Approved By Admin', 'green'],
  ['Approved By Licensor', 'green']
])

const sections = [ {gid: '1201675561988415', name: 'Untitled section', resource_type: 'section'},
{gid: '1202110923593137', name: 'Order Form Inquiry', resource_type: 'section'},
{gid: '1201697191761872', name: 'GENERAL', resource_type: 'section'},
{gid: '1201676388962279', name: 'CHECK AFFINITY', resource_type: 'section'},
{gid: '1201681956608998', name: 'Pending approval after affinity', resource_type: 'section'},
{gid: '1201713389856031', name: 'FEEDBACK', resource_type: 'section'}];
export class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      designs: null,
      pageNum: 1,
      taskData: []
    }
  }
  async componentDidMount(){
    var configDesigns = {
      method: 'get',
      url: 'http://localhost:8000/designs',
      headers: {}
    };

    axios(configDesigns).then((res) => {
      this.setState({
        designs: res.data.designs.data
      })
    })
    .catch((error) => {
      console.log(error)
    });

    var sectionData = [];

    sections.forEach(section => {
      console.log(section)
      var configTasks= {
        method: 'get',
        url: `http://localhost:8000/fetchtasks?gid=${section.gid}`,
        headers: {}
      };

      axios(configTasks).then((res) => {
        console.log(res.data.tasks.data.length)
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
    console.log(this.state.taskData)
    return (
      <div className='dashboard mt3'>
        {
          this.state.taskData.length !== 6 ?
          <Row className='w-100' justify='center'>
            <Col lg={2}><Spin indicator={antIcon} className='dashboard-designs-spin'/></Col>
          </Row> :
          <Row>
            <Col lg={12}>
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
            <Col lg={12}>
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
        }
        <Row className='dashboard-designs w-100 mr3 mt3'>
          <Row justify='centre' className='dashboard-designs-header w-100 pr3 pl3'>
            <Col lg={5} className=''>Past Designs</Col>
            <Col lg={19}></Col>
          </Row>
          <Divider />
          {
            this.state.designs == null
            ? <Row className='w-100' justify='center'>
              <Col lg={2}><Spin indicator={antIcon} className='dashboard-designs-spin'/></Col>
            </Row>
            :<>
                <Row justify='center' gutter={16} className='w-100'>
                  {
                    this.state.designs.slice((this.state.pageNum-1)*4, this.state.pageNum*4).map((design, index) => {
                      return(
                        <Col lg={6}>
                          <Card
                            key={index}
                            hoverable
                            className='dashboard-designs-card'
                            cover={<Row justify='center' align='middle' className='dashboard-designs-card-image-wrapper'>
                              <Col className='pa2'><img alt="example" className='dashboard-designs-card-image' src={design.iterations[0].image.urls.or} /></Col>
                            </Row>}
                          >
                            <Meta title={<Row justify='center'>
                              <Col span={8}>{design.title ? design.title.length > 15 ? design.title.slice(0,14)+'...' : design.title: ''}</Col>
                              <Col span={12} offset={4} >{design.primary_client ? design.primary_client.name.length > 15 ? design.primary_client.name.slice(0,14)+'...' : design.primary_client.name : ''}</Col>
                            </Row>} description={<span className={designPhases.get(design.phase.name)}>{design.phase.name}</span>} />
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
                <Row className='w-100 pt3' justify='center'>
                  <Col lg={7}><Pagination pageSize={4} total={this.state.designs.length} onChange={(e) => this.setState({pageNum: e})}/></Col>
                </Row>
            </>
          }
        </Row>
      </div>
    )
  }
}

export default Dashboard