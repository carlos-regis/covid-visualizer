import React from 'react';

function CountriesNav({ selectedCountry, onUpdateCountry }) {
  const countries = ['All', 'USA', 'India', 'France', 'Germany', 'Brazil', 'Japan', 'Italy', 'UK'];

  return (
    <select 
      onChange={(event) => onUpdateCountry(event.target.value)}
      selected={selectedCountry}
    >
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}

class CovidStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'All',
    };

    this.updateCountry = this.updateCountry.bind(this);
  }

  updateCountry(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  render() {
    const { selectedCountry } = this.state;

    return (
      <main>    
        <CountriesNav 
          selected={selectedCountry}
          onUpdateCountry={this.updateCountry}
        />
        {JSON.stringify(this.state.selectedCountry, null, 2)}
      </main>
    );
  }
}

export default CovidStats;