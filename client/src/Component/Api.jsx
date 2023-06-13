import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = () => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setOptions(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
    
    
    
    console.log(options);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <h1>Select Example</h1>
      <select style={{width: "150px"}} value={selectedValue} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Selected value: {selectedValue}</p>
    </div>
  );
};

export default API;
