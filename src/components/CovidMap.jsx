import React from 'react';

class CovidMap extends React.Component {
  render() {
    const countries = ['USA', 'India', 'France', 'Germany', 'Brazil', 'Japan', 'Italy', 'UK'];
    return (
      <select name="" id="">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    );
  }
}

export default CovidMap;