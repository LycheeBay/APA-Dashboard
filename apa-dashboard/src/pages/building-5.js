import React, { useEffect, useState } from 'react';
import Building5Map from '../components/building-5-map.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/building.css';

function findKennelData(data, kennel) {
  for (let i = 0; i < data.length; i++) {
    if (parseInt(data[i].kennelNumber) === parseInt(kennel)) {
      return data[i];
    }
  }
  return null;
}

function KennelsSummary(data) {
  const volunteerColorCounts = data.reduce((counts, item) => {
    const color = item.volunteerColor.split(' ')[0];
    counts[color] = (counts[color] || 0) + 1;
    return counts;
  }, {});
  console.log(volunteerColorCounts);
  return volunteerColorCounts;
}

function KennelsCount(data) {
  const uniqueKennelNumbers = [...new Set(data.map(item => item.kennelNumber))];
  const uniqueKennelCount = uniqueKennelNumbers.length;
  return uniqueKennelCount;
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
  const kennelColorMap = KennelsSummary(data);

  return (
    <div>
      <div className="building-map">
        <Building5Map />
      </div>
      <div className="building-info">
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
              <Button href="/tlac/building-5">Back</Button>
            </Card.Body>
          </Card>
        </div>
        : 
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Building 5 Summary</Card.Title>
            <Card.Text>
              {data.length > 0 ? 
              <p>
                Total Occupied Kennels: {KennelsCount(data)}
                {kennelColorMap ? 
                <div>
                  <table style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>
                    <tr>
                      <th style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>Color</th>
                      <th style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>Count</th>
                    </tr>
                    {Object.entries(kennelColorMap).map(([key, value]) => (
                      <tr key={key}>
                        <td style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>{key}</td>
                        <td style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>{value}</td>
                      </tr>
                    ))}
                  </table>
                </div> : null}
                Note: total number of color tallies may not match total number of occupied kennels,
                as kennels may have multiple animals.
              </p> : 
              <p>Error</p>
              }
            </Card.Text>
          </Card.Body>
        </Card>
        }
      </div>
    </div>
  );
}

export default Building5;
