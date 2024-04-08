import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';

// function filterData(data, 

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

  const currentUrl = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword');
  const color = urlParams.get('color');
  const location = urlParams.get('location');
  console.log(keyword);

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
