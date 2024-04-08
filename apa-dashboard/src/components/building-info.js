import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';


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
  if (location) {
    filteredData = filteredData.filter((data) => isInRange(data['kennelNumber'], location));
  }
  if (color) {
    filteredData = filteredData.filter((data) => data['color'] === color);
  }
  if (keyword) {
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

function BuildingInfo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/kennel/start=1&end=265`);
      // console.log(response);
      const newData = await response.json();
      // console.log(newData);
      setData(newData['data']);
    };
    fetchData();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword');
  const color = urlParams.get('color');

  const location = urlParams.get('location');
  console.log(keyword);
  console.log(color);
  console.log(location);
  console.log(data);

  console.log(filterData(data, color, location, keyword));

  return (
    <div className="BuildingInfo">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>d</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BuildingInfo;
