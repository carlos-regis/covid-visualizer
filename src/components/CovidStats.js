import React from 'react';

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
      selectedCountry: selectedCountry,
    });
  }
  
  render() {
    const countries = ['All', 'USA', 'India', 'France', 'Germany', 'Brazil', 'Japan', 'Italy', 'UK'];
    return (
      <main>    
        <select 
          onChange={(event) => this.updateCountry(event.target.value)}
          selected={this.state.selectedCountry}>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {JSON.stringify(this.state.selectedCountry, null, 2)}
      </main>
    );
  }
}

export default CovidStats;