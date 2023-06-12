import React, { Component } from 'react'
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import axios from "axios";
import DTF from './DTF';
import Screenprint from './Screenprint';
import Embroidery from './Embroidery';

const { Dragger } = Upload;

var printTypes = [
  {
    label: 'Direct to film',
    value: 'dtf'
  },
  {
    label: 'Screen Print',
    value: 'screenprint'
  }, 
  {
    label: 'Embroidery',
    value: 'embroidery'
  },
];

export class Quoter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      printType: 'screenprint',
      disc_dtf: [],
      disc_embroidery: [],
      disc_screenprint: [],
      dtf: [],
      embroidery: [],
      screenprint: [],
      dtf_metadata: [],
      embroidery_metadata: [],
      screenprint_metadata: [],
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
        var obj = []

        for(var i=0; i<res.data.solution.length; i++){
          obj.push({
            label: res.data.solution[i].Item,
            value: res.data.solution[i].Cost
          })
        }

        this.setState({
          dtf: obj
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
        var obj = []

        for(var i=0; i<res.data.solution.length; i++){
          obj.push({
            label: res.data.solution[i].Item,
            value: res.data.solution[i].Cost
          })
        }

        this.setState({
          embroidery: obj
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
        var obj = []

        for(var i=0; i<res.data.solution.length; i++){
          obj.push({
            label: res.data.solution[i].Item,
            value: res.data.solution[i].Cost
          })
        }

        this.setState({
          screenprint: obj
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
  
  render() {
    // console.log(this.state)
    return (
      <div className="upload mt3 mb3">
        <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3">
          <Col lg={8} className="f4 font-prim-big">
            Get Quote | <span>{this.state.printType === 'dtf' ? 'Direct to film': this.state.printType}</span>
          </Col>
          <Col lg={16}></Col>
        </Row>
        <Divider />
        <Row justify="center" gutter={16} className="mb3">
          <Col lg={18}>
          <div className="pl2 pr2 pt2 font-prim-small">Print Type</div>
            <Select
              // defaultValue={this.state.printType}
              style={{ width: '100%' }}
              onChange={(e) => {this.setState({printType: e}); this.props.getprintType(e)}}
              options={printTypes}
              value={this.state.printType}
            />

            {
              this.state.printType === 'dtf' ? 
                <DTF 
                  dtfItemList = {this.state.dtf} 
                  meta = {this.state.dtf_metadata} 
                  discount = {this.state.disc_dtf}
                  getprintType = {this.props.getprintType}
                  gettotalCost = {this.props.gettotalCost}
                  getquantity = {this.props.getquantity}
                  getitemCost = {this.props.getitemCost}
                  getlogoCost = {this.props.getlogoCost}
                  getlocationSizes = {this.props.getlocationSizes}
                  getlocationColors = {this.props.getlocationColors}
                  getscreens = {this.props.getscreens}
                  getlocation = {this.props.getlocation}
                  getitem = {this.props.getitem}
                />
              : this.state.printType === 'screenprint' ?  
                <Screenprint 
                  screenPrintItemList = {this.state.screenprint} 
                  meta = {this.state.screenprint_metadata} 
                  discount = {this.state.disc_screenprint}
                  getprintType = {this.props.getprintType}
                  gettotalCost = {this.props.gettotalCost}
                  getquantity = {this.props.getquantity}
                  getitemCost = {this.props.getitemCost}
                  getlogoCost = {this.props.getlogoCost}
                  getlocationSizes = {this.props.getlocationSizes}
                  getlocationColors = {this.props.getlocationColors}
                  getscreens = {this.props.getscreens}
                  getlocation = {this.props.getlocation}
                  getitem = {this.props.getitem}
                />
              : <Embroidery 
                  embroideryItemList = {this.state.embroidery} 
                  meta = {this.state.embroidery_metadata} 
                  discount = {this.state.disc_embroidery}
                  getprintType = {this.props.getprintType}
                  gettotalCost = {this.props.gettotalCost}
                  getquantity = {this.props.getquantity}
                  getitemCost = {this.props.getitemCost}
                  getlogoCost = {this.props.getlogoCost}
                  getlocationSizes = {this.props.getlocationSizes}
                  getlocationColors = {this.props.getlocationColors}
                  getscreens = {this.props.getscreens}
                  getlocation = {this.props.getlocation}
                  getitem = {this.props.getitem}
                  getlogoSize = {this.props.getlogoSize}
                />
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Quoter