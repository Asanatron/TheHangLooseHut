import React, { Component } from 'react'
import axios from 'axios';
import { Col, Divider, Row , Spin, Card, Pagination} from 'antd';
import { VictoryPie } from 'victory';
import { LoadingOutlined } from '@ant-design/icons';
import './dashboard.css';

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const { Meta } = Card;

const designPhases = [
  {status: 'On Hold', id: 1},
  {status: 'Pending Licensor Review', id: 2},
  {status: 'Pending Admin Review', id: 3},
  {status: 'Rejected By Licensor', id: 7},
  {status: 'Rejected By Admin', id: 8},
  {status: 'Final Rejected By Admin', id: 9},
  {status: 'Approved By Admin With Changes', id: 12},
  {status: 'Approved By Licensor With Changes', id: 13},
  {status: 'Approved By Admin', id: 14},
  {status: 'Approved By Licensor', id: 15}
]

export class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      designs: null,
      pageNum: 1,
      search: ''
    }
  }
  async componentDidMount(){
    var config = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/designs?page=1',
      headers: {}
    };

    axios(config).then((res) => {
      this.setState({
        designs: res.data.designs.data
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    var displayDesigns = this.state.designs == null ? null :this.state.designs.filter((design) => {
      return design.title.toLowerCase().includes(this.state.search.toLowerCase())
    })

    return (
      <div className='dashboard'>
        <Row>
          <Col>
            <VictoryPie 
              data={[
                { x: "Cats", y: 35 },
                { x: "Dogs", y: 40 },
                { x: "Birds", y: 55 }
              ]}
            />
          </Col>
        </Row>

        <Row className='dashboard-designs mr3'>
          <Row justify='centre' className='dashboard-designs-header w-100 pr3 pl3'>
            <Col lg={3} className=''>Past Designs</Col>
            <Col lg={19}></Col>
            {/* <Col lg={4}><Search className='dashboard-designs-search-button' placeholder="input search text" onSearch={(e) => this.setState({search: e})} enterButton/></Col> */}
            <Col lg={2} className='tr'><a className='dashboard-designs-header-see-all'>See All</a></Col>
          </Row>
          <Divider />
          {
            displayDesigns == null
            ? <Row className='w-100' justify='center'>
              <Col lg={2}><Spin indicator={antIcon} className='dashboard-designs-spin'/></Col>
            </Row>
            : displayDesigns.length === 0 
            ? <div className='tc w-100 dashboard-designs-oops'>
              <p className='f1 b'>Oops !!!</p>
              <p className='f2'>Your search did not match any result</p>
            </div> 
            :<>
                <Row justify='center' gutter={16} className='w-100'>
                  {
                    displayDesigns.slice((this.state.pageNum-1)*4, this.state.pageNum*4).map((design, index) => {
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
                              <Col span={8}>{design.title}</Col>
                              <Col span={12} offset={4} >{design.primary_client.name.length > 15 ? design.primary_client.name.slice(0,14)+'...' : design.primary_client.name}</Col>
                            </Row>} description={design.phase.name} />
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
                <Row className='w-100 pt3' justify='center'>
                  <Col lg={7}><Pagination pageSize={4} total={displayDesigns.length} onChange={(e) => this.setState({pageNum: e})}/></Col>
                </Row>
            </>
          }
        </Row>
      </div>
    )
  }
}

export default Dashboard
