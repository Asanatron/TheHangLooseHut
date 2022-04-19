import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";
import { Spin } from "antd";
import "./index.css";

// const designPhases = [
//     { status: "On Hold", id: 1 },
//     { status: "Pending Licensor Review", id: 2 },
//     { status: "Pending Admin Review", id: 3 },
//     { status: "Rejected By Licensor", id: 7 },
//     { status: "Rejected By Admin", id: 8 },
//     { status: "Final Rejected By Admin", id: 9 },
//     { status: "Approved By Admin With Changes", id: 12 },
//     { status: "Approved By Licensor With Changes", id: 13 },
//     { status: "Approved By Admin", id: 14 },
//     { status: "Approved By Licensor", id: 15 },
//   ];

var colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const defaultLabelStyle = {
  fontSize: "5px",
  fontFamily: "sans-serif",
};

function makeTooltipContent(entry) {
  return `Section ${entry.tooltip} has ${entry.value} tasks`;
}

const Dashboard = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [sectionName, setSectionName] = useState([]);
  const [tasksForEachSection, setTasksForEachSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(undefined);
  const [hovered, setHovered] = useState(null);

  useEffect(async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer 1/1201848339257965:2a0d668cd2058837abd46b7c0e285f9f"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const projectSections = await fetch(
      "https://app.asana.com/api/1.0/projects/1201675561988414/sections",
      requestOptions
    );

    const allSections = await projectSections.text();
    const sectionNames = [];
    const promises = [];
    JSON.parse(allSections).data.map((section) => {
      promises.push(
        fetch(
          `https://app.asana.com/api/1.0/sections/${section.gid}/tasks`,
          requestOptions
        )
      );
      sectionNames.push(section.name);
    });

    setSectionName(sectionNames);

    const JSONPromises = [];
    await Promise.all(promises).then((values) => {
      values.forEach((value) => {
        JSONPromises.push(value.text());
      });
    });
    const tasksInEachSectionSize = [];
    const sectionWiseTask = [];

    await Promise.all(JSONPromises).then((values) => {
      values.forEach((value) => {
        tasksInEachSectionSize.push(JSON.parse(value).data.length);
        sectionWiseTask.push(JSON.parse(value));
      });
    });
    setTasksForEachSection(sectionWiseTask);
    let computePieChartData = [];
    sectionNames.forEach((sec, index) => {
      computePieChartData.push({
        title: sec,
        value: tasksInEachSectionSize[index],
        color: colorArray[index],
        tooltip: sec,
      });
    });
    setPieChartData(computePieChartData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="example">
        <Spin size="large" />
        <span>Building Analytics from Asana</span>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="pieChart">
        <div data-tip="" data-for="chart">
          <PieChart
            data={pieChartData}
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
            onClick={(_, index) => {
              setSelected(index === selected ? undefined : index);
            }}
            animate
            labelStyle={{
              ...defaultLabelStyle,
            }}
            labelPosition={90}
            onMouseOver={(_, index) => {
              setHovered(index);
            }}
            onMouseOut={() => {
              setHovered(null);
            }}
          />
          <ReactTooltip
            id="chart"
            getContent={() => {
              if (hovered != null) {
                return makeTooltipContent(pieChartData[hovered]);
              }
              return null;
            }}
          />
        </div>
      </div>
      <div className="pieChartInfo">
        <h1>Click on any pie to get list of all tasks.</h1>
      </div>
    </div>
  );
};

export default Dashboard;
