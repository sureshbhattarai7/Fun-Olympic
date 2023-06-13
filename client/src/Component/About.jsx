import axios from 'axios';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [countryApi, setCountryApi] = useState([]);

  const country = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    country().then((data) => {
      setCountryApi(data);
    });
  }, []);

  console.log('data in state is', countryApi);

  return (
    <div>
      <h1>Country List</h1>
      {countryApi.map((el) => (
        <h1 key={el.name.common}>{el.name.common}</h1>
      ))}
    </div>
  );
};

export default About;
