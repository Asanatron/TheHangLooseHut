import React, { Component } from "react";
import "./content.css";

import { Card, Row } from "antd";

function buildUrl(url) {
  const updatedUrl = "https://asanatron.github.io/TheHangLooseHut/" + url;
  return updatedUrl;
}
export class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log("props", props);
  }
  updateSelectedPage = (selectedPage) => {
    this.props.onPageSelected(selectedPage);
    localStorage.setItem('pageSelected',selectedPage);
  };
  openPage = (page) => {
    window.open(page, "_blank");
  };
  render() {
    return (
      <>
       <Row style={{minHeight: '85vh'}} gutter={16}>

        <div class="dashboard-container">
          <div class="section">
            <div class="background"></div>
            <div class="dashboard-items">
              <div class="logo-green-box"></div>
              <div
                class="event-calendar-box"
                onClick={() => this.openPage("https://www.google.com/")}
                >
                <div class="event-calendar-icon">
                  <img
                    alt=""
                    src={buildUrl("/8c32683645151b3e2ae5edbfaab26c0bsvg.svg")}
                    />
                </div>
                <div class="event-calendar-text">
                  <b>Event Calendar</b>
                </div>
              </div>
              <div
                class="asanatron-box"
                onClick={() => {
                  if (
                    this.props.userType == "asanatron"
                    
                  )
                    this.updateSelectedPage(this.props.userType);
                }}
                >
                <div class="asanatron-box-icon">
                  <div class="div1">
                    <img
                      alt=""
                      src={buildUrl("/41be184befe6d8538f5544bcb171ecc9svg.svg")}
                      />
                  </div>
                </div>
                <div class="asanatron-text">
                  <div>
                    <b class="asanatron">Asanatron</b>
                  </div>
                </div>
              </div>
              <div
                class="salesforce-box"
                onClick={() => {
                  if (this.props.userType == "salesforce")
                  this.updateSelectedPage("salesforce");
                }}
                >
                <div class="salesforce-box-icon">
                  <div class="div1">
                    <img
                      alt=""
                      src={buildUrl("/3fad94cc147ac8f114383a6df39c2360svg.svg")}
                      />
                  </div>
                </div>
                <div class="salesforce-text"
                  onClick={() => this.openPage("https://thehangloosehut.my.salesforce.com/")}
                >
                  <div>
                    <b class="salesforce">Salesforce</b>
                  </div>
                </div>
              </div>
              <div
                class="quotemaster-box"
                onClick={() => {
                  if (
                    this.props.userType == "admin" ||
                    this.props.userType == "quotemaster"
                    )
                    this.updateSelectedPage(this.props.userType);
                  }}
                  >
                <div class="quote-master-box">
                  <div class="quote-master-icon">
                    <div class="div1">
                      <img
                        alt=""
                        src={buildUrl(
                          "/56bc5cd2a31f0dfe320ad03348c5229esvg.svg"
                          )}
                          />
                    </div>
                  </div>
                  <div class="quote-master-text">
                    <b>Quotemaster</b>
                  </div>
                </div>
              </div>

              <div
                class="social-media-container"
                onClick={() => this.openPage("https://facebook.com/")}
                >
                <div>
                  <div class="social-media-icon">
                    <div class="div1">
                      <img
                        alt=""
                        src={buildUrl(
                          "/e30e65cb51efcf9a560f5c0c4f1368bbsvg.svg"
                          )}
                          />
                    </div>
                  </div>
                  <div class="social-media-text">
                    <b>Social Media</b>
                  </div>
                </div>
              </div>

              <div
                class="campus-abassador-box"
                onClick={() => this.openPage("https://www.google.com/")}
                >
                <div class="campus-abassador-icon">
                  <div class="div1">
                    <img
                      alt=""
                      src={buildUrl("/713cb64e55ebdc2d3a158801a85878b7svg.svg")}
                      />
                  </div>
                </div>
                <div class="campus-abassador-text">
                  <b>Campus Abassador</b>
                </div>
              </div>

              <div class="logo-text">
                <b class="the-hangloosehut">
                  <p class="the">The</p>
                  <p class="the">HangLooseHut</p>
                </b>
              </div>

              <div class="heading">
                <i class="clothconnect">CLOTHCONNECT</i>
              </div>
            </div>
          </div>
        </div>
                      </Row>
      </>
    );
  }
}
