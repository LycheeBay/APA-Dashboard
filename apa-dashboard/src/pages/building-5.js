import React, { useEffect, useState } from 'react';
import Building5Map from '../components/building-5-map.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function findKennelData(data, kennel) {
  for (let i = 0; i < data.length; i++) {
    if (parseInt(data[i].kennelNumber) === parseInt(kennel)) {
      return data[i];
    }
  }
  return null;
}

function Building5() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/kennel/start=1&end=24`);
      // console.log(response);
      const newData = await response.json();
      // console.log(newData);
      setData(newData['data']);
    };
    fetchData();
  }, []);

  const currentUrl = window.location.href;
  const kennelNumber = currentUrl.substring(currentUrl.lastIndexOf('/') + 1).substring(7);

  return (
    <div className="Building-5">
      <Building5Map />
      {currentUrl.substring(currentUrl.lastIndexOf('/') + 1).startsWith('kennel=') ? 
      <div className="KennelInfo">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Kennel {kennelNumber}</Card.Title>
          <Card.Text>
            {findKennelData(data, kennelNumber) ? <p>
              Volunteer Color: {findKennelData(data, kennelNumber)['volunteerColor']}<br />
              Dog Name: {findKennelData(data, kennelNumber)['name']}<br />
            </p> : 
            <p>No information available for kennel.</p>}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
      : null}
    </div>
  );
}

export default Building5;
