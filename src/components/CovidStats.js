import React from 'react';
import PropTypes from 'prop-types';
import { fetchCovidData } from '../utils/api';

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

CountriesNav.propTypes = {
  selectedCountry: PropTypes.string.isRequired,
  onUpdateCountry: PropTypes.func.isRequired,
};

class CovidStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'All',
      countries: null,
      error: null
    };

    this.updateCountry = this.updateCountry.bind(this);
  }

  componentDidMount() {
    this.updateCountry(this.state.selectedCountry);
  }

  updateCountry(selectedCountry) {
    this.setState({
      selectedCountry,
      error: null
    });

    fetchCovidData(selectedCountry)
      .then((countries) =>
        this.setState({
          countries,
          error: null,
        }),
      )
      .catch((error) => {
        console.warn('Error fetching countries: ', error);

        this.setState({
          error: `There was an error fetching the countries`,
        });
      });

  }

  render() {
    const { selectedCountry, countries, error } = this.state;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Covid Cases</h1> 
          <CountriesNav 
            selected={selectedCountry}
            onUpdateCountry={this.updateCountry}
            />
        </div>
        { error && <p className="text-center error">{error}</p>}

        {countries && <pre>{JSON.stringify(countries, null, 2)}</pre>}
      </main>
    );
  }
}

export default CovidStats;