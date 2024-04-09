import { useEffect, useState } from 'react';


function isInRange(kennelNumber, buildingNum) {
    if (buildingNum) {
      const numberAfterDash = parseInt(buildingNum.split('-')[1]);
      console.log(numberAfterDash);
      console.log(process.env.BUILDING_END[numberAfterDash]);
      return kennelNumber >= process.env.BUILDING_START[numberAfterDash] && kennelNumber <= process.env.BUILDING_END[numberAfterDash];
    }
    return true;
}
  
function filterData(data, color, location, keyword) {
    let filteredData = data;
    // console.log("Filtering data: "+ data);
    if (location !== "All") {
      filteredData = filteredData.filter((data) => isInRange(data.kennelNumber, location));
    }
    if (color !== "All") {
      filteredData = filteredData.filter((data) => data.color === color);
    }
    if (keyword !== "") {
      filteredData = filteredData.filter((data) => {
        for (let key in data) {
            if (typeof data[key] === 'string' && data[key].includes(keyword)) {
            return true;
            }
        }
        return false;
      });
    }
    return filteredData;
}
  
function Search() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/kennel/start=1&end=265`);
        const newData = await response.json();
        console.log("Response from API: "+newData.data);
        setData(newData.data);
      };
      fetchData();
    }, []);
  
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('keyword');
    const color = urlParams.get('color');
  
    const location = urlParams.get('location');
    console.log("Keyword: "+keyword);
    console.log("Color: "+color);
    console.log("Location: "+location);
    //console.log("Data: "+ data[0].age);
    console.log("Filtered Data from the functions: "+filterData(data, color, location, keyword));
    const filteredData = filterData(data, color, location, keyword);


return (
    <div>
        { filteredData ? filteredData.map((item, index) => (
            <div key={index}>
                {item['kennelNumber']}: {item['volunteerColor']}
            </div>
        )) : 
        <div>
            No data found.
        </div>
        }
    </div>
);
}

export default Search;
