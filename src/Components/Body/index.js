import React, { Component } from "react";
import "./content.css";
import { Layout, Row, Col, Button } from "antd";
import HLHLogoText from "../../Media/HLHLogoText.png";
import HLHLogo from "../../Media/hlhlogo.png";
import "./content.css";
import Asanatron from "../Asanatron";
import Quotemaster from "../Quotemaster";
import Admin from "../Admin";
import { DashBoard } from "../DashBoardPage";
import CryptoJS from 'crypto-js';

const { Content, Footer } = Layout;

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = { pageSelected: "" };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageSelected !== prevState.pageSelected) {
      // console.log(this.state.pageSelected, "from body");
    }
  }

  componentDidMount(prevProps, prevState) {
    const userType = localStorage.getItem("userType");
    if (userType) {
      const bytes = CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(userType, "iCiTd51fTn")
      );
      const decryptedUserType = bytes.toString();
      if (
        decryptedUserType == "admin" ||
        decryptedUserType == "asanatron" ||
        decryptedUserType == "quotemaster"
      ) {
        this.setState({
          loginState: "LoggedIn",
          userType: decryptedUserType,
          pageSelected:decryptedUserType
        });
      }
    }
  }
  handleLogout = () => {
    localStorage.removeItem("userType");
    window.location.reload();
  };

  handlePageSelected = (page) => {
    this.setState({ pageSelected: page });
  };
  render() {
    return (
      <Layout className="content-background">
        <Row className="header" align="center" justify="middle">
          <Col
          // remove comment to make log out button to right
          // span={24} align='center'
          >
            <img alt="TheHangLooseHut" className="header-logo" src={HLHLogo} />
            <img
              alt="TheHangLooseHut"
              className="header-logo-text"
              src={HLHLogoText}
            />
            <span className="logo-ext">
              {" "}
              <span className="f3">x</span> {this.props.userType}
            </span>
            <Button
              type="primary"
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={this.handleLogout}
            >
              Log Out
            </Button>
          </Col>
        </Row>
        <Content>
          {this.state.pageSelected == "" ? (
            <DashBoard
              selectedTool={this.state.pageSelected}
              onPageSelected={this.handlePageSelected}
              userType={this.props.userType}
            />
          ) : this.props.userType === "asanatron" ? (
            <Asanatron />
          ) : this.props.userType === "quotemaster" ? (
            <Quotemaster />
          ) : this.props.userType === "admin" ? (
            <Admin />
          ) : (
            <div>Bad path</div>
          )}
        <Footer className="footer" style={{ textAlign: "center" }}>
          © THE HANG LOOSE HUT 2023
        </Footer>
        </Content>
      </Layout>
    );
  }
}

export default Body;
