import TLACMap from "../components/tlac-map.js" ;
import Building5Map from "../components/building-5-map.js" ;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import '../style/building.css';


function isInRange(kennelNumber, buildingNum) {
    const building_start = [0, 101, 164, 210, 26, 1]
    const building_end =[0, 154, 209, 265, 60, 24]
    if (buildingNum) {
      const numberAfterDash = parseInt(buildingNum.split('-')[1]);
      console.log("Processed Building Number: " + numberAfterDash);
      console.log(building_start[numberAfterDash]);
      return kennelNumber >= building_start[numberAfterDash] && kennelNumber <= building_end[numberAfterDash];
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

    // {{urlParams.get('location') === "Building-5" }? <Building5Map /> : <div>Invalid location</div>}


return (
    <div>
      <div className="building-map">
      {
        location === "All" ? 
          <TLACMap />
         : 
         <div>
          {location === "Building-5" ? <Building5Map /> : <div>Invalid location</div>}
         </div>
      }
      </div>
      <div className="building-info">
        { filteredData ? filteredData.map((item, index) => (
          <div key={index}>
            <Card>
              <Card.Title>Kennel {item['kennelNumber']}: {item['name']}</Card.Title>
              <Card.Body>
                <Card.Text>
                  <p>Color: {item['volunteerColor']}</p>
                  <p>DoB: {item['animalDoB']}</p>
                  <p>Breed: {item['breed']}</p>
                  <p>Animal ID: {item['animalInternalID']}</p>
                </Card.Text>
              </Card.Body>
            </Card>
            
          </div>
        )) : 
        <div>
          No data found.
        </div>
        }
      </div>
    </div>
);
}

export default Search;
