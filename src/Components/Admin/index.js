import React, { Component } from 'react'
import { Layout, Row, Col, Spin, Divider, Button, Table, Input, notification, Select} from 'antd';
import { VictoryPie, VictoryLegend } from 'victory';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import "./admin.css";
import Pink from '../../Media/pink.png'

const SmallantIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

const disc_clmn = [
  {
    title: 'Piece',
    dataIndex: 'Piece',
    key: 'Piece',
  },
  {
    title: 'Discount',
    dataIndex: 'Discount',
    key: 'Discount',
    render: (text, record) => {
      return `${text}%`;
    },
  }
];
const table_clmn = [
  {
    title: 'Item',
    dataIndex: 'Item',
    key: 'Item',
  },
  {
    title: 'Cost',
    dataIndex: 'Cost',
    key: 'Cost',
    render: (text, record) => {
      return `$${text}`;
    },
  }
];
const metadata_clmn = [
  {
    title: 'Label',
    dataIndex: 'Label',
    key: 'Label',
  }, {
    title: 'Value',
    dataIndex: 'Value',
    key: 'Value',
  }
];

const tables = [{
  value: 'disc_dtf',
  label: 'Direct to film Discount'
}, {
  value: 'disc_embroidery',
  label: 'Embroidery Discount'
}, {
  value: 'disc_screenprint',
  label: 'Screenprint Discount'
}, {
  value: 'dtf',
  label: 'Direct to film Cost'
}, {
  value: 'embroidery',
  label: 'Embroidery Cost'
}, {
  value: 'screenprint',
  label: 'Screenprint Cost'
}, {
  value: 'dtf_metadata',
  label: 'Direct to film Details'
}, {
  value: 'embroidery_metadata',
  label: 'Embroidery Details'
}, {
  value: 'screenprint_metadata',
  label: 'Screenprint Details'
}]

const metadata = [{
  tableName: 'disc_dtf',
  keyColumn: 'piece',
  valueColumn: 'discount'
}, {
  tableName: 'disc_embroidery',
  keyColumn: 'piece',
  valueColumn: 'discount'
}, {
  tableName: 'disc_screenprint',
  keyColumn: 'piece',
  valueColumn: 'discount'
}, {
  tableName: 'dtf',
  keyColumn: 'item',
  valueColumn: 'cost'
}, {
  tableName: 'embroidery',
  keyColumn: 'item',
  valueColumn: 'cost'
}, {
  tableName: 'screenprint',
  keyColumn: 'item',
  valueColumn: 'cost'
}, {
  tableName: 'dtf_metadata',
  keyColumn: 'label',
  valueColumn: 'value'
}, {
  tableName: 'embroidery_metadata',
  keyColumn: 'label',
  valueColumn: 'value'
}, {
  tableName: 'screenprint_metadata',
  keyColumn: 'label',
  valueColumn: 'value'
},]

export class Admin extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      updating: false,
      disc_dtf: [],
      disc_embroidery: [],
      disc_screenprint: [],
      dtf: [],
      embroidery: [],
      screenprint: [],
      dtf_metadata: [],
      embroidery_metadata: [],
      screenprint_metadata: [],
      printType: '',
      tableType: 'disc_dtf',
      keyColumn: '',
      keyValue: '',
      newValue: null,
      updColumn: '',
      reload:null,
      tableUpdated: false,
    }
  }

  toObject(keys, values, type) {
    const arrObj = [];
    
    for(var i = 0; i<keys.length; i++){
      if(type == 'disc'){
        var obj = {
          label: keys[i].Piece,
          value: values[i].Piece
        }
      } else if(type == 'items'){
        var obj = {
          label: keys[i].Item,
          value: values[i].Item
        }
      } else{ 
        var obj = {
          label: keys[i].Label,
          value: values[i].Label
        }
      }

      arrObj.push(obj)
    }

    return arrObj;
  }
  componentDidUpdate(prevProps, prevState) {
    // Check if the specific state property you want to track has changed
    if (this.state.reload !== prevState.reload || this.state.tableUpdated!==prevState.tableUpdated) {
      // Perform actions or set new state here if needed
     
      // Forcing a re-render by updating state can be done like this:
      this.setState({ updating: false,
        disc_dtf: [],
        disc_embroidery: [],
        disc_screenprint: prevState.disc_screenprint,
        dtf: [],
        embroidery: [],
        screenprint: [],
        dtf_metadata: [],
        embroidery_metadata: [],
        screenprint_metadata: [],
        printType: '',
        tableType: 'disc_dtf',
        keyColumn:  prevState.keyColumn,
        keyValue: prevState.keyValue,
        newValue:null,
        updColumn: '',
        reload:null});
        var GetTableData_disc_dtf = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_dtf',
          headers: {}
        }
    
        axios(GetTableData_disc_dtf).then((res) => {
          this.setState({
            disc_dtf: res.data.solution
          })
    
          var GetTableData_dtf = {
            method: 'get',
            url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=dtf',
            headers: {}
          }
      
          axios(GetTableData_dtf).then((res) => {
            this.setState({
              dtf: res.data.solution
            })
    
            var GetTableData_dtf_metadata = {
              method: 'get',
              url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=dtf_metadata',
              headers: {}
            }
    
            axios(GetTableData_dtf_metadata).then((res) => {
              this.setState({
                dtf_metadata: res.data.solution
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
    
        var GetTableData_disc_embroidery = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_embroidery',
          headers: {}
        }
    
        axios(GetTableData_disc_embroidery).then((res) => {
          this.setState({
            disc_embroidery: res.data.solution
          })
    
          var GetTableData_embroidery = {
            method: 'get',
            url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=embroidery',
            headers: {}
          }
      
          axios(GetTableData_embroidery).then((res) => {
            this.setState({
              embroidery: res.data.solution
            })
    
            var GetTableData_embroidery_metadata = {
              method: 'get',
              url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=embroidery_metadata',
              headers: {}
            }
    
            axios(GetTableData_embroidery_metadata).then((res) => {
              this.setState({
                embroidery_metadata: res.data.solution
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
    
        var GetTableData_disc_screenprint = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_screenprint',
          headers: {}
        }
    
        axios(GetTableData_disc_screenprint).then((res) => {
          this.setState({
            disc_screenprint: res.data.solution
          })
    
          var GetTableData_screenprint = {
            method: 'get',
            url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint',
            headers: {}
          }
      
          axios(GetTableData_screenprint).then((res) => {
            this.setState({
              screenprint: res.data.solution
            })
    
            var GetTableData_screenprint_metadata = {
              method: 'get',
              url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint_metadata',
              headers: {}
            }
    
            axios(GetTableData_screenprint_metadata).then((res) => {
              this.setState({
                screenprint_metadata: res.data.solution
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

        axios(GetTableData_disc_screenprint).then((res) => {
          this.setState({
            disc_screenprint: res.data.solution
          })
    
          var GetTableData_screenprint = {
            method: 'get',
            url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint',
            headers: {}
          }
      
          axios(GetTableData_screenprint).then((res) => {
            this.setState({
              screenprint: res.data.solution
            })
    
            var GetTableData_screenprint_metadata = {
              method: 'get',
              url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint_metadata',
              headers: {}
            }
    
            axios(GetTableData_screenprint_metadata).then((res) => {
              this.setState({
                screenprint_metadata: res.data.solution
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
      // Alternatively, you can force a re-render by using forceUpdate()
      // this.forceUpdate();
    }
  }

  async componentDidMount(){
    var GetTableData_disc_dtf = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_dtf',
      headers: {}
    }

    axios(GetTableData_disc_dtf).then((res) => {
      this.setState({
        disc_dtf: res.data.solution
      })

      var GetTableData_dtf = {
        method: 'get',
        url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=dtf',
        headers: {}
      }
  
      axios(GetTableData_dtf).then((res) => {
        this.setState({
          dtf: res.data.solution
        })

        var GetTableData_dtf_metadata = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=dtf_metadata',
          headers: {}
        }

        axios(GetTableData_dtf_metadata).then((res) => {
          this.setState({
            dtf_metadata: res.data.solution
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

    var GetTableData_disc_embroidery = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_embroidery',
      headers: {}
    }

    axios(GetTableData_disc_embroidery).then((res) => {
      this.setState({
        disc_embroidery: res.data.solution
      })

      var GetTableData_embroidery = {
        method: 'get',
        url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=embroidery',
        headers: {}
      }
  
      axios(GetTableData_embroidery).then((res) => {
        this.setState({
          embroidery: res.data.solution
        })

        var GetTableData_embroidery_metadata = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=embroidery_metadata',
          headers: {}
        }

        axios(GetTableData_embroidery_metadata).then((res) => {
          this.setState({
            embroidery_metadata: res.data.solution
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

    var GetTableData_disc_screenprint = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=disc_screenprint',
      headers: {}
    }

    axios(GetTableData_disc_screenprint).then((res) => {
      this.setState({
        disc_screenprint: res.data.solution
      })

      var GetTableData_screenprint = {
        method: 'get',
        url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint',
        headers: {}
      }
  
      axios(GetTableData_screenprint).then((res) => {
        this.setState({
          screenprint: res.data.solution
        })

        var GetTableData_screenprint_metadata = {
          method: 'get',
          url: 'https://thehangloosehutbackend.herokuapp.com/sql?tblName=screenprint_metadata',
          headers: {}
        }

        axios(GetTableData_screenprint_metadata).then((res) => {
          this.setState({
            screenprint_metadata: res.data.solution
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
  }

  UpdateTable(){
    if(this.state.keyValue != '' && this.state.newValue != null && this.state.tableType != ''){
      var meta = metadata.find((data) => data.tableName == this.state.tableType)

      console.log(meta)

      if(this.state.tableType == "disc_dtf" || this.state.tableType == "disc_embroidery" || this.state.tableType == "disc_screenprint"){
        this.setState({
          newValue: `${this.state.newValue}`
        })
      }

      if(this.state.tableType == "dtf_metadata" || this.state.tableType == "screenprint_metadata" || this.state.tableType == "embroidery_metadata"){
        this.setState({
          newValue: `${this.state.newValue}`
        })
      }



      var UpdateTable = {
        method: 'post',
        url: `https://thehangloosehutbackend.herokuapp.com/update?tblName=${this.state.tableType}&keyValue=${encodeURIComponent(this.state.keyValue)}&keyColumn=${meta.keyColumn}&newValue=${this.state.newValue}&updColumn=${meta.valueColumn}`,
        headers: {}
      }

      axios(UpdateTable).then((res) => {
        console.log(res)
        this.setState({reload:"reload"})
        console.log(this.state)
        notification.success({
          message: `Data Updated`,
          placement: "bottomRight",
        });
        // update component
        this.setState({
          updating: false
        })
        this.setState({
          keyColumn: ''
        })
        this.setState({ tableUpdated: true });
      })
    } else{
      notification.error({
        message: `Complete the form`,
        placement: "bottomRight",
      });
      this.setState({
        updating: false
      })
    }
  }

  render() {
    var dtf_disc_css = ''
    var dtf_items_css = ''
    var dtf_meta_css = ''
    var emb_disc_css = ''
    var emb_item_css = ''
    var emb_meta_css = ''
    var sp_disc_css = ''
    var sp_item_css = ''
    var sp_meta_css = ''
    this.state.tableType == 'disc_dtf' ? dtf_disc_css = 'ba b--green': 
    this.state.tableType == 'disc_embroidery' ? emb_disc_css = 'ba b--green' : 
    this.state.tableType == 'disc_screenprint' ? sp_disc_css = 'ba b--green' : 
    this.state.tableType == 'dtf' ? dtf_items_css = 'ba b--green' : 
    this.state.tableType == 'embroidery' ? emb_item_css = 'ba b--green' : 
    this.state.tableType == 'screenprint' ? sp_item_css = 'ba b--green' : 
    this.state.tableType == 'dtf_metadata' ? dtf_meta_css = 'ba b--green' : 
    this.state.tableType == 'embroidery_metadata' ? emb_meta_css = 'ba b--green' : 
    this.state.tableType == 'screenprint_metadata' ? sp_meta_css = 'ba b--green' : 

    console.log("test 1",this.toObject(this.state.dtf, this.state.dtf))
    return (
      <div>
        <Row style={{minHeight: '85vh'}} gutter={16}>
          <Col lg={6}>
          <div className='asana ma3'>
              <Row>
                <Col lg={22} className='font-prim-big'>
                  Update Calculator Data
                  <Divider />
                  <div className='pl3'>
                    <div className="pr2 pt3 font-prim-small">Table to Update</div>
                      <Select
                        defaultValue="disc_dtf"
                        style={{ width: '100%', fontSize: '18px'}}
                        onChange={(e) => {this.setState({tableType: e})}}
                        options={tables}
                        value={this.state.tableType}
                      />

                    <div className="pr2 pt3 font-prim-small">Key</div>
                    {this.state.tableUpdated?<Select
                        defaultValue={this.state.keyValue}
                        style={{ width: '100%', fontSize: '18px' }}
                        onChange={(e) => {this.setState({keyValue: e})}}
                        optionFilterProp="children"
                          options={
                          this.state.tableType == 'disc_dtf' ? this.toObject(this.state.disc_dtf,this.state.disc_dtf, 'disc') : 
                          this.state.tableType == 'disc_embroidery' ? this.toObject(this.state.disc_embroidery, this.state.disc_embroidery, 'disc') : 
                          this.state.tableType == 'disc_screenprint' ? this.toObject(this.state.disc_screenprint, this.state.disc_screenprint, 'disc') : 
                          this.state.tableType == 'dtf' ? this.toObject(this.state.dtf, this.state.dtf, 'items') : 
                          this.state.tableType == 'embroidery' ? this.toObject(this.state.embroidery, this.state.embroidery, 'items') : 
                          this.state.tableType == 'screenprint' ? this.toObject(this.state.screenprint, this.state.screenprint, 'items') : 
                          this.state.tableType == 'dtf_metadata' ? this.toObject(this.state.dtf_metadata, this.state.dtf_metadata, 'meta') : 
                          this.state.tableType == 'embroidery_metadata' ? this.toObject(this.state.embroidery_metadata, this.state.embroidery_metadata, 'meta') : 
                          this.state.tableType == 'screenprint_metadata' ? this.toObject(this.state.screenprint_metadata, this.state.screenprint_metadata, 'meta') : 
                          []
                        }
                        value={this.state.keyValue}
                      />:<Select
                      defaultValue={this.state.keyValue}
                      style={{ width: '100%', fontSize: '18px' }}
                      onChange={(e) => {this.setState({keyValue: e})}}
                      optionFilterProp="children"
                        options={
                          
                        this.state.tableType == 'disc_dtf' ? this.toObject(this.state.disc_dtf,this.state.disc_dtf, 'disc') : 
                        this.state.tableType == 'disc_embroidery' ? this.toObject(this.state.disc_embroidery, this.state.disc_embroidery, 'disc') : 
                        this.state.tableType == 'disc_screenprint' ? this.toObject(this.state.disc_screenprint, this.state.disc_screenprint, 'disc') : 
                        this.state.tableType == 'dtf' ? this.toObject(this.state.dtf, this.state.dtf, 'items') : 
                        this.state.tableType == 'embroidery' ? this.toObject(this.state.embroidery, this.state.embroidery, 'items') : 
                        this.state.tableType == 'screenprint' ? this.toObject(this.state.screenprint, this.state.screenprint, 'items') : 
                        this.state.tableType == 'dtf_metadata' ? this.toObject(this.state.dtf_metadata, this.state.dtf_metadata, 'meta') : 
                        this.state.tableType == 'embroidery_metadata' ? this.toObject(this.state.embroidery_metadata, this.state.embroidery_metadata, 'meta') : 
                        this.state.tableType == 'screenprint_metadata' ? this.toObject(this.state.screenprint_metadata, this.state.screenprint_metadata, 'meta') : 
                        []
                      }
                      value={this.state.keyValue}
                    />}

                    <div className="pr2 pt3 font-prim-small">New Value</div>
                    <Input
                      className=""
                      placeholder="Enter new value of the key"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^\d*\.?\d*$/.test(newValue)) { // Allow integers and decimals
                          this.setState({ newValue });
                        }
                      }}
                      value={this.state.newValue}
                      style={{ width: '100%', fontSize: '18px' }}
                    />

                    <Row align='middle' justify='center'>
                      <Col>
                      {
                        this.state.updating === false ?
                        <Button className="mt4" style={{minWidth: '32px', height: '60%'}} type="primary" onClick={() => {this.UpdateTable();this.setState({tableUpdated:true})}}>
                          <img className="button-logo v-middle" src={Pink}></img><span className='f4'>Update Calculator</span>
                          </Button>
                        : <Button className="mt4" style={{minWidth: '32px'}} type="primary">
                        <Spin indicator={SmallantIcon} className='dashboard-designs-spin'/>
                      </Button> 
                      }
                      </Col>
                    </Row>
                    {/* {      
                      this.state.updating === false 
                      ? 
                      : 
                    } */}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={18}>
            <Content className='data-side mt2 mb2' style={{ padding: '0px 0px 0px 16px' }}>
              <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3 mt2 mb2">
                <Col lg={4} className="f4 font-prim-big">
                  Direct to film
                </Col>
                <Col lg={20}></Col>
                <Divider />
              </Row>
              <Row gutter={16}  className=' mt1 mb1 pr4 pl4'>
                <Col md={8}>
                  <div className='font-prim-small'>Discount</div>
                  <Table className={dtf_disc_css} loading={this.state.disc_dtf.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.disc_dtf} columns={disc_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Items</div>
                  <Table className={dtf_items_css} pagination={{pageSize: 8, position: ['bottomCenter']}} loading={this.state.dtf.length == 0} bordered={true} size='small' dataSource={this.state.dtf} columns={table_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Details</div>
                  <Table className={dtf_meta_css} loading={this.state.dtf_metadata.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.dtf_metadata.slice(0,7)} columns={metadata_clmn}/>
                </Col>
              </Row>

              <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3 mt2 mb2">
                <Col lg={4} className="f4 font-prim-big">
                  Embroidery
                </Col>
                <Col lg={20}></Col>
                <Divider />
              </Row>
              <Row gutter={16}  className=' mt1 mb1 pr4 pl4'>
                <Col md={8}>
                  <div className='font-prim-small'>Discount</div>
                  <Table className={emb_disc_css} loading={this.state.disc_embroidery.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.disc_embroidery.slice(0,8)} columns={disc_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Items</div>
                  <Table className={emb_item_css} pagination={{pageSize: 8, position: ['bottomCenter']}} loading={this.state.embroidery.length == 0} bordered={true} size='small' dataSource={this.state.embroidery} columns={table_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Details</div>
                  <Table className={emb_meta_css} loading={this.state.embroidery_metadata.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.embroidery_metadata.slice(0,5)} columns={metadata_clmn}/>
                </Col>
              </Row>

              <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3 mt2 mb2">
                <Col lg={4} className="f4 font-prim-big">
                  Screen Print
                </Col>
                <Col lg={20}></Col>
                <Divider />
              </Row>
              <Row gutter={16}  className=' mt1 mb1 pr4 pl4'>
                <Col md={8}>
                  <div className='font-prim-small'>Discount</div>
                  <Table className={sp_disc_css} loading={this.state.disc_screenprint.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.disc_screenprint} columns={disc_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Items</div>
                  <Table className={sp_item_css} pagination={{pageSize: 8, position: ['bottomCenter']}} loading={this.state.screenprint.length == 0} bordered={true} size='small' dataSource={this.state.screenprint} columns={table_clmn}/>
                </Col>
                <Col md={8}>
                  <div className='font-prim-small'>Details</div>
                  <Table className={sp_meta_css} loading={this.state.screenprint_metadata.length == 0} pagination={false} bordered={true} size='small' dataSource={this.state.screenprint_metadata} columns={metadata_clmn}/>
                </Col>
              </Row>
              
            </Content>
          </Col>
        </Row>  
      </div>
    )
  }
}

export default Admin