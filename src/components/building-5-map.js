import React, { useEffect, useState } from "react";

function getColor(number, colorData) {
  var finalColor = "rgb(216, 216, 216)";
  var flag = false;
  if (colorData && colorData.length > 0) {
    colorData.forEach(item => {
      if (item.kennelNumber === number && !flag) {
        finalColor = item.volunteerColor;
        flag = true;
      }
    });
  }
  // console.log(number, finalColor);
  return finalColor;
}

function Building5Map() {
  const [colorData, setColorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // todo: use .env
      const response = await fetch(`http://127.0.0.1:5000/api/kennel-color/start=1&end=24`);
      const newData = await response.json();
      // console.log(newData);
      setColorData(newData['data']);
    };
  
    fetchData();
  }, []);

  // if (colorData.length > 0) {console.log(colorData[0]);}

  // this is the faulting line
  // console.log(getColor(5), colorData);

  return (<svg
    viewBox="0 0 506.602 197.624"
    width={506.602}
    height={197.624}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <image
      width={507}
      height={200}
      x={-0.127}
      y={-2.166}
      xlinkHref="data:image/png;base64,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"
    />
    <a xlinkHref="/tlac/building-5/kennel=24">
      <rect
        x={1.208}
        y={32.341}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(24, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=23">
      <rect
        x={0.878}
        y={66.011}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(23, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=22">
      <rect
        x={0.878}
        y={99.682}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(22, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=21">
      <rect
        x={1.538}
        y={132.033}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(21, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=20">
      <rect
        x={44.452}
        y={165.703}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(20, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=19">
      <rect
        x={87.366}
        y={165.043}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(19, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=18">
      <rect
        x={126.979}
        y={132.032}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(18, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=17">
      <rect
        x={127.639}
        y={165.043}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(17, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=16">
      <rect
        x={168.572}
        y={132.032}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(16, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=15">
      <rect
        x={169.232}
        y={165.043}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(15, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=14">
      <rect
        x={212.145}
        y={132.032}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(14, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=13">
      <rect
        x={212.145}
        y={165.043}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(13, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=12">
      <rect
        x={255.059}
        y={131.372}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(12, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=11">
      <rect
        x={253.079}
        y={164.382}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(11, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=10">
      <rect
        x={296.652}
        y={132.032}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(10, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=9">
      <rect
        x={296.652}
        y={164.383}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(9, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=8">
      <rect
        x={337.585}
        y={132.693}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(8, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=7">
      <rect
        x={336.265}
        y={165.703}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(7, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=6">
      <rect
        x={378.519}
        y={132.032}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(6, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=5">
      <rect
        x={379.839}
        y={165.703}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(5, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=4">
      <rect
        x={421.432}
        y={132.692}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(4, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=3">
      <rect
        x={422.093}
        y={165.043}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(3, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=2">
      <rect
        x={464.346}
        y={132.693}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(2, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
    <a xlinkHref="/tlac/building-5/kennel=1">
      <rect
        x={462.365}
        y={164.382}
        width={41.593}
        height={31.69}
        style={{
          fill: getColor(1, colorData),
          stroke: "rgb(0, 0, 0)",
          fillOpacity: 0.4,
        }}
      />
    </a>
  </svg>);
};
export default Building5Map;
