import React, { Component } from "react";
import { Col, Divider, Row, Spin, Input, Upload, Pagination, Card, Select, Button, Radio, notification } from "antd";
import { LoadingOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
// import uuid from "react-uuid";
import "./upload.css";

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const SmallantIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Dragger } = Upload;
const { Option } = Select;
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


export class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      designs: null,
      clients: null,
      treeData: null,

      image: null,
      files: null,
      FILEBASE64URI: null,

      imageName: "",
      category: "",
      title: "",
      clientID: "",
      desc: "",
      is_expedited: false,
      pageNum: 1,

      uploading: false,

      sectionID: ''
    };

    this.onPost = this.onPost.bind(this)
  }

  async componentDidMount() {
    var configDesigns = {
      method: 'get',
      url: 'https://thehangloosehutbackend.herokuapp.com/designs',
      headers: {}
    };

    axios(configDesigns).then((res) => {
      this.setState({
        designs: res.data.designs.data
      })
    }).catch((error) => {
      notification.error({
            message: `${error}`,
            placement: "bottomRight",
          });
    });

    var configClients = {
      method: "get",
      url: "https://thehangloosehutbackend.herokuapp.com/clients",
    };

    axios(configClients)
      .then((res) => {
        this.setState({
          clients: res.data.clients.data,
        });
      }).catch((error) => {
        notification.error({
            message: `test ${error}`,
            placement: "bottomRight",
          });;
      });

    var configCategories = {
      method: "get",
      url: "https://thehangloosehutbackend.herokuapp.com/categories",
    };

    axios(configCategories)
      .then((res) => {
        var categories = [];
        
        res.data.categories.map((category) => {
          categories.push({
            id: category.id,
            name: category.name
          });
        });

        this.setState({
          treeData: categories,
        });
      }).catch((error) => {
        notification.error({
            message: `${error}`,
            placement: "bottomRight",
          });;
      });
  }

  onPost() {
    var link = ''
    if(this.state.desc[this.state.desc.length-1] === 'f'){
      var subs1 = this.state.desc.substring(0,this.state.desc.lastIndexOf("/"))
      link = subs1.substring(subs1.lastIndexOf("/")+1)
    } else{
      link = this.state.desc.substring(this.state.desc.lastIndexOf("/")+1)
    }

    if (
      (this.state.imageName !== "" || this.state.title) &&
      this.state.category !== "" &&
      this.state.clientID !== "" &&
      this.state.desc !== "" &&
      this.state.image !== null &&
      this.state.uploading === false
    ) {
      this.setState({
        uploading: true
      })

      var configPost = {}
      if(this.state.is_expedited){
        configPost = {
          method: "post",
          url: "https://thehangloosehutbackend.herokuapp.com/designs/",
          data: {
            title: this.state.title.length === 0 ? this.state.imageName.substring(0, this.state.imageName.lastIndexOf(".")) : this.state.title,
            product_category_id: Number(this.state.category),
            image: this.state.image,
            image_filename: this.state.imageName.substring(0, this.state.imageName.lastIndexOf(".")),
            description: link,
            primary_client_id: this.state.clientID,
            is_expedited: this.state.is_expedited,
          },
        };
      } else {
        configPost = {
          method: "post",
          url: "https://thehangloosehutbackend.herokuapp.com/designs/",
          data: {
            title: this.state.title.length === 0 ? this.state.imageName.substring(0, this.state.imageName.lastIndexOf(".")) : this.state.title,
            product_category_id: Number(this.state.category),
            image: this.state.image,
            image_filename: this.state.imageName.substring(0, this.state.imageName.lastIndexOf(".")),
            description: link,
            primary_client_id: this.state.clientID,
          },
        };
      }

      axios(configPost)
        .then((res) => {
          var AddTagConfig = {
            method: "post",
            url: `https://thehangloosehutbackend.herokuapp.com/tagreview?taskid=${link}`,
            headers: {}
          };

          axios(AddTagConfig).then((res => {
            var GetTaskConfig = {
              method: "get",
              url: `https://thehangloosehutbackend.herokuapp.com/gettask?taskid=${link}`,
              headers: {}
            };

            axios(GetTaskConfig).then((res) => {
              if(res.data.task.data.parent){
                this.setState({
                  ParentID: res.data.task.data.parent.gid
                })
              } else {
                this.setState({
                  ParentID: res.data.task.data.gid
                })
              }
              var GetParentConfig = {
                method: "get",
                url: `https://thehangloosehutbackend.herokuapp.com/getprojectid?taskid=${this.state.ParentID}`,
                headers: {}
              };
              axios(GetParentConfig).then((res) => {
                var GetSections = {
                  method: "get",
                  url: `https://thehangloosehutbackend.herokuapp.com/getsections?projectid=${res.data.projectID}`,
                  headers: {}
                };
          
                axios(GetSections).then((res) => {
                  this.setState({
                    sectionID: res.data.sectionID
                  })
                })
                })

              var GetAllSubtasksConfig = {
                method: "get",
                url: `https://thehangloosehutbackend.herokuapp.com/getsubtask?taskid=${this.state.ParentID}`,
                headers: {}
              };
              

              axios(GetAllSubtasksConfig).then((res) => {
                var isComplete = true

                Promise.all(res.data.subtasks.data.map(subtask => {
                  return axios.get(`https://thehangloosehutbackend.herokuapp.com/gettask?taskid=${subtask.gid}`)
                })).then(values => {
                  values.map(value => {
                    if(value.data.task.data.tags.length === 0){
                      isComplete = false
                    } else if(value.data.task.data.tags.length !== 0){
                      isComplete = true
                    }
                  })

                  if(isComplete === true){
                    if(this.state.sectionID){
                      console.log("section found")
                      var MoveTaskConfig = {
                        method: "post",
                        url: `https://thehangloosehutbackend.herokuapp.com/movetask?taskid=${this.state.ParentID}&sectionid=${this.state.sectionID}`,
                        headers: {}
                      };
                      axios(MoveTaskConfig).then((res) => {
                        notification.success({
                          message: `Successfully uploaded design to affinity`,
                          description: 'Moved asana task',
                          placement: "bottomRight",
                        })
                        this.setState({
                          uploading: false,
                          category: "",
                          title: "",
                          clientID: "",
                          desc: "",
                          is_expedited: false,
                          files: null,
                          imageName: "",
                          FILEBASE64URI:  null,
                          image: null
                        })
  
                        var configDesigns = {
                          method: 'get',
                          url: 'https://thehangloosehutbackend.herokuapp.com/designs',
                          headers: {}
                        };
                    
                        axios(configDesigns).then((res) => {
                          this.setState({
                            designs: res.data.designs.data
                          })
                        }).catch((error) => {
                          notification.error({
                            message: `${error}`,
                            placement: "bottomRight",
                          });
                        });
                      }).catch((error => {
                        notification.error({
                          message: `${error}`,
                          placement: "bottomRight",
                        });
                      }))
                    }
                  } else{
                    notification.success({
                      message: `Successfully uploaded design to affinity`,
                      placement: "bottomRight",
                    })
                    this.setState({
                      uploading: false,
                      category: "",
                      title: "",
                      clientID: "",
                      desc: "",
                      is_expedited: false,
                      files: null,
                      imageName: "",
                      FILEBASE64URI:  null,
                      image: null
                    })

                    var configDesigns = {
                      method: 'get',
                      url: 'https://thehangloosehutbackend.herokuapp.com/designs',
                      headers: {}
                    };
                
                    axios(configDesigns).then((res) => {
                      this.setState({
                        designs: res.data.designs.data
                      })
                    }).catch((error) => {
                      notification.error({
                        message: `${error}`,
                        placement: "bottomRight",
                      });
                    });
                  }
                }) 
              }).catch((error => {
                notification.error({
                  message: `${error}`,
                  placement: "bottomRight",
                });
              }))
            }).catch((error => {
              notification.error({
                message: `${error}`,
                placement: "bottomRight",
              });
            }))
          })).catch((error => {
              notification.error({
              message: `${error}`,
              placement: "bottomRight",
            });
          }))
        }).catch((error) => {
          notification.error({
            message: `${error}`,
            placement: "bottomRight",
          });
        })
    } else {
      notification.error({
        message: `Complete the form`,
        placement: "bottomRight",
      });
      this.setState({
        uploading: false
      })
    }
  }

  render() {
    const props = {
      name: "file",
      multiple: false,
      fileList: [],
      onRemove: (file) => {
        this.setState({
          fileList: null,
          FILEBASE64URI: null,
          image: null,
        });
      },
      beforeUpload: (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result,
            file: file,
          };

          this.setState({
            files: file,
            imageName: fileInfo.name,
            FILEBASE64URI: fileInfo.base64,
            image: fileInfo.type === 'image/png' ? fileInfo.base64.slice(22) : fileInfo.base64.slice(23)
          });
        };
        return false;
      },
    };

    return (
      <div className="upload mt3 mb3">
        <Row justify="centre" className="dashboard-designs-header w-100 pr3 pl3">
          <Col lg={4} className="f4">
            Upload Design
          </Col>
          <Col lg={20}></Col>
        </Row>
        <Divider />
        <Row justify="center" gutter={16} className="mb3">
          <Col lg={11}>
            <Dragger {...props}>
              {this.state.FILEBASE64URI && (
                <img alt='design to be uploaded' src={this.state.FILEBASE64URI} width={"500px"} />
              )}
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Supported files: jpg, jpeg and png only
              </p>
            </Dragger>
          </Col>
          <Col lg={11}>
            <div className="pb1 pa2 f5 b">Title</div>
            <Input
              className=""
              placeholder={this.state.imageName.length === 0 ? "Enter design title" : this.state.imageName.substring(0,this.state.imageName.lastIndexOf("."))}
              onChange={(e) => this.setState({ title: e.target.value })}
              value={this.state.title}
            />
            <div className="pb1 pa2 f5 b">Task Link</div>
            <Input
              className=""
              placeholder="Enter design description"
              onChange={(e) => this.setState({ desc: e.target.value })}
              value={this.state.desc}
            />
            <div className="pb1 pa2 f5 b">Primary Licensor</div>
            <Select
              defaultOpen=""
              onChange={(e) => {
                this.setState({ clientID: e });
              }}
              className="w-100"
              placeholder="Select province"
              value={this.state.clientID}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {this.state.clients ? (
                this.state.clients.map((client, index) => {
                  return (
                    <Option key={index} value={client.id}>
                      {client.name}
                    </Option>
                  );
                })
              ) : (
                <Option value={0}>
                  <Row className="w-100" justify="center">
                    <Col lg={2}>
                      <Spin
                        indicator={antIcon}
                        className=""
                      />
                    </Col>
                  </Row>
                </Option>
              )}
            </Select>
            <div className="pb1 pa2 f5 b">Category</div>
            <Select
              defaultOpen=""
              onChange={(e) => {
                this.setState({ category: e });
              }}
              className="w-100"
              placeholder="Select province"
              value={this.state.category}
              showSearch
              filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            >
              {this.state.treeData ? (
                this.state.treeData.map((category, index) => {
                  return (
                    <Option key={index} value={category.id}>
                      {category.name}
                    </Option>
                  );
                })
              ) : (
                <Option value={0}>
                  <Row className="w-100" justify="center">
                    <Col lg={2}>
                      <Spin
                        indicator={antIcon}
                        className=""
                      />
                    </Col>
                  </Row>
                </Option>
              )}
            </Select>
            {/* <TreeSelect
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={this.state.treeData}
              placeholder="Select Category"
              onChange={(e) => {
                this.setState({ category: e });
              }}
              value={this.state.category}
              showSearch
            /> */}
            <div className="pb1 pa2 f5 b">Expediter</div>
            <Radio.Group className="tc" onChange={(e) => {this.setState({is_expedited: e.target.value})}} value={this.state.is_expedited}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row justify="center mb3 pt3">
          {
            this.state.uploading === false 
            ? <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.onPost()}}>
              Upload to Affinity
            </Button> 
            : <Button className="" style={{minWidth: '32px'}} type="primary" onClick={() => {this.onPost()}}>
            <Spin indicator={SmallantIcon} className='dashboard-designs-spin'/>
          </Button> 
          }
          
        </Row>
        <Row className='dashboard-designs w-100 ma3'>
          <Row justify='centre' className='dashboard-designs-header w-100 pr3 pl3'>
            <Col lg={5} className='f4'>Past Designs</Col>
            <Col lg={19}></Col>
          </Row>
          <Divider />
          {
            this.state.designs == null
            ? <Row className='w-100 mb3' justify='center'>
              <Col lg={2}><Spin indicator={antIcon} className=''/></Col>
            </Row>
            :<>
                <Row justify='center' gutter={16} className='w-100'>
                  {
                    this.state.designs.slice((this.state.pageNum-1)*4, this.state.pageNum*4).map((design, index) => {
                      return(
                        <Col key={index} lg={6}>
                          <Card
                            hoverable
                            className='dashboard-designs-card'
                            cover={<Row justify='center' align='middle' className='dashboard-designs-card-image-wrapper'>
                              <Col className='pa2'><img alt="example" className='dashboard-designs-card-image' src={design.iterations[0].image.urls.or} /></Col>
                            </Row>}
                          >
                            <Meta title={<Row justify='center'>
                              <Col span={8}>{design.title ? design.title.length > 30 ? design.title.slice(0,29)+'...' : design.title: ''}</Col>
                              <Col span={12} offset={4} ></Col>
                            </Row>} description={<div><div>{design.primary_client ? design.primary_client.name : ''}</div><span className={designPhases.get(design.phase.name)}>{design.phase.name}</span></div>} />
                          </Card>
                        </Col>
                      )
                    })
                  }
                </Row>
                <Row className='w-100 pt3' justify='center'>
                  <Col lg={10}><Pagination pageSize={4} total={this.state.designs.length} onChange={(e) => this.setState({pageNum: e})}/></Col>
                </Row>
            </>
          }
        </Row>
      </div>
    );
  }
}

export default Submission;
