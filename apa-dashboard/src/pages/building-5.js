import React, { useEffect } from 'react';
import Building5Map from '../components/building-5-map.js';

function Building5() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:5000/api/kennel/start=1&end=24`);
      // console.log(response);
      const newData = await response.json();
      // console.log(newData);
    };
  
    fetchData();
  });

  return (
    <div className="Building-5">
      <Building5Map />
    </div>
  );
}

export default Building5;
