import React, { Component } from "react";
import {
  Col,
  Divider,
  Row,
  Spin,
  Input,
  Upload,
  message,
  Select,
  TreeSelect,
  Button,
  notification,
} from "antd";
import { LoadingOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import uuid from "react-uuid";
import "./upload.css";

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;
const { Dragger } = Upload;
const { Option } = Select;

export class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: null,
      category: "",
      title: "",
      location: "",
      clientID: "",
      treeData: null,
      desc: "",
      image: null,
      imageName: "",
      mainLink: "",
      files: null,
      FILEBASE64URI: null,
    };
  }

  async componentDidMount() {
    var configclients = {
      method: "get",
      url: "https://thehangloosehutbackend.herokuapp.com/clients",
    };

    axios(configclients)
      .then((res) => {
        this.setState({
          clients: res.data.clients.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    var configcategories = {
      method: "get",
      url: "https://thehangloosehutbackend.herokuapp.com/categories",
    };

    axios(configcategories)
      .then((res) => {
        var categories = [];
        res.data.categories.map((category) => {
          categories.push({
            title: category[0],
            value: uuid(),
            children: category[1],
            selectable: false,
          });
        });

        this.setState({
          treeData: categories,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPost() {
    if (
      this.state.title !== "" &&
      this.state.category !== "" &&
      this.state.location !== "" &&
      this.state.clientID !== "" &&
      this.state.desc !== "" &&
      this.state.image !== null &&
      this.state.imageName !== "" &&
      this.state.mainLink !== ""
    ) {
      console.log(this.state);
      var configPost = {
        method: "post",
        url: "http://localhost:8000/designs/",
        data: {
          title: this.state.title,
          product_category_id: Number(this.state.category),
          image: this.state.image,
          image_filename: this.state.imageName,
          description: this.state.desc,
          primary_client_id: this.state.clientID,
          is_expedited: true,
        },
      };

      axios(configPost)
        .then((res) => {
          notification.success({
            message: `${this.state.title} design uploaded successfully to Affinity.`,
            placement: "bottomRight",
          });
          console.log(res);
        })
        .catch((error) => {
          notification.error({
            message: `${error}`,
            placement: "bottomRight",
          });
          console.log(error);
        });
    } else {
      notification.error({
        message: `Complete the form`,
        placement: "bottomRight",
      });
    }
  }

  render() {
    const { files } = this.state;

    const props = {
      name: "file",
      multiple: false,
      fileList: [],
      onRemove: (file) => {
        this.setState((state) => {
          // If we have to provide multi file suppourt
          // const index = state.files.indexOf(file);
          // const newFileList = state.files.slice();
          // const newFileBASE64URI = state.FILEBASE64URI.slice();
          // newFileList.splice(index, 1);
          // newFileBASE64URI.splice(index, 1);
          return {
            fileList: null,
            FILEBASE64URI: null,
            image: null,
          };
        });
      },
      beforeUpload: (file) => {
        // FILEBASE64URI
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Make a fileInfo Object
          let fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + " kB",
            base64: reader.result,
            file: file,
          };

          this.setState((state) => ({
            // If we have to provide multi file suppourt
            // fileList: [...state.fileList, file],
            // FILEBASE64URI: [...state.FILEBASE64URI, fileInfo],
            files: file,
            imageName: fileInfo.name,
            FILEBASE64URI: fileInfo.base64,
            image: fileInfo.base64.slice(22),
          }));
        };
        return false;
      },
    };

    return (
      <div className="upload mt3">
        <Row
          justify="centre"
          className="dashboard-designs-header w-100 pr3 pl3"
        >
          <Col lg={3} className="">
            Upload Design
          </Col>
          <Col lg={21}></Col>
          {/* <Col lg={4}><Search className='dashboard-designs-search-button' placeholder="input search text" onSearch={(e) => this.setState({search: e})} enterButton/></Col> */}
        </Row>
        <Divider />
        <Row justify="center" gutter={16} className="mb3">
          <Col lg={11}>
            <Dragger {...props}>
              {this.state.FILEBASE64URI && (
                <img src={this.state.FILEBASE64URI} width={"500px"} />
              )}
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Supported files: jpg, jpeg, png, pdf.
              </p>
            </Dragger>
          </Col>
          <Col lg={11}>
            <div className="pb1 pa2 f5 b">Title</div>
            <Input
              className=""
              placeholder="Enter design title"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <div className="pb1 pa2 f5 b">Description</div>
            <Input
              className=""
              placeholder="Enter design description"
              onChange={(e) => this.setState({ desc: e.target.value })}
            />
            <div className="pb1 pa2 f5 b">Location</div>
            <Input
              className=""
              placeholder="Enter client location"
              onChange={(e) => this.setState({ location: e.target.value })}
            />
            <div className="pb1 pa2 f5 b">Primary Licensor</div>
            <Select
              defaultOpen=""
              onChange={(e) => {
                this.setState({ clientID: e });
              }}
              className="w-100"
              placeholder="Select province"
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
                        className="dashboard-designs-spin"
                      />
                    </Col>
                  </Row>
                </Option>
              )}
            </Select>
            <div className="pb1 pa2 f5 b">Category</div>
            <TreeSelect
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={this.state.treeData}
              placeholder="Select Category"
              onChange={(e) => {
                this.setState({ category: e });
              }}
            />
            <div className="pb1 pa2 f5 b">Main Link</div>
            <Input
              className=""
              placeholder="Enter client location"
              onChange={(e) => this.setState({ mainLink: e.target.value })}
            />
          </Col>
        </Row>
        <Row justify="center mb3 pt3">
          <Button
            className=""
            type="primary"
            onClick={() => {
              this.onPost();
            }}
          >
            Upload to Affinity
          </Button>
        </Row>
      </div>
    );
  }
}

export default Submission;
