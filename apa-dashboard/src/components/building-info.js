import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';

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
  const kennelColorMap = KennelsSummary(data);

  return (
    <div className="BuildingInfo">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>TLAC Summary</Card.Title>
          <Card.Text>
            {data.length > 0 ? 
            <p>
              Total Occupied Kennels: {KennelsCount(data)}
              {kennelColorMap ? 
              <div>
                <table style={{border: "1px solid rgb(0, 0, 0)", padding: "8px"}}>
                  <tr>
                    <th style={{border: "2px solid black", padding: "8px"}}>Color</th>
                    <th style={{border: "2px solid black", padding: "8px"}}>Count</th>
                  </tr>
                  {Object.entries(kennelColorMap).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{border: "2px solid black", padding: "8px"}}>{key}</td>
                      <td style={{border: "2px solid black", padding: "8px"}}>{value}</td>
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
    </div>
  );
}

export default BuildingInfo;
