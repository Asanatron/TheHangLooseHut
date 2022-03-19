import React, { Component } from 'react'
import { Col, Divider, Row , Spin, Card, Pagination, Input} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import './status.css'

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const { Meta } = Card;
const { Search } = Input;

export class Status extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      search: '',
      desigs: null,
      filter: '',
      pageNum: 1
    }
  }

  async componentDidMount(){
    var config = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/designs?page='+this.state.pageNum,
      body: {}
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

  async UpdateDesigns(pageNum){
    this.setState({
      designs: null
    })
    var config = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/designs?page='+pageNum,
      body: {}
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

    console.log(displayDesigns)

    return (
      <div className='status mt3 mb3'>
        <Row justify='centre' className='dashboard-designs-header w-100 pr3 pl3'>
          <Col lg={3} className=''>Past Designs</Col>
          <Col lg={17}></Col>
          <Col lg={4}><Search className='dashboard-designs-search-button' placeholder="input search text" onSearch={(e) => this.setState({search: e})} enterButton/></Col>
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
                  displayDesigns.map((design, index) => {
                    return(
                      <Col className='mt2 mb2' lg={4}>
                        <Card
                          key={index}
                          hoverable
                          className='status-designs-card'
                          cover={<Row justify='center' align='middle' className='status-designs-card-image-wrapper'>
                            <Col className='pa2'><img alt="example" className='status-designs-card-image' src={design.iterations[0].image.urls.or} /></Col>
                          </Row>}
                        >
                          <Meta title={<Row justify='center'>
                            <Col span={8}>{design.title}</Col>
                            <Col span={12} offset={4} >{design.primary_client ? design.primary_client.name.length > 10 ? design.primary_client.name.slice(0,9)+'...' : design.primary_client.name : ''}</Col>
                          </Row>} description={design.phase.name} />
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
              <Row className='w-100 pt3' justify='center'>
                <Col lg={8}><Pagination pageSize={30} total={2710} onChange={(e) => this.UpdateDesigns(e)} showSizeChanger={false}/></Col>
              </Row>
            </>
        }
      </div>
    )
  }
}

export default Status