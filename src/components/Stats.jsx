import React from 'react';
import PropTypes from 'prop-types';
import { fetchCovidData } from '../utils/api';
import Table from './Table';
import Loading from './Loading';

function CountriesNav({ selectedCountry, onUpdateCountry }) {
    const countries = [
        'All',
        'USA',
        'India',
        'France',
        'Germany',
        'Brazil',
        'Japan',
        'Italy',
        'UK',
    ];

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

class Stats extends React.Component {
    state = {
        selectedCountry: 'All',
        countries: null,
        error: null,
        loading: true,
    };

    componentDidMount() {
        this.updateCountry(this.state.selectedCountry);
    }

    updateCountry = (selectedCountry) => {
        this.setState({
            selectedCountry: selectedCountry,
            error: null,
        });

        fetchCovidData(selectedCountry)
            .then((countries) =>
                this.setState({
                    countries,
                    error: null,
                    loading: false,
                }),
            )
            .catch((error) => {
                console.warn('Error fetching countries: ', error);

                this.setState({
                    error: `There was an error fetching the countries`,
                    loading: false,
                });
            });
    };

    render() {
        const { selectedCountry, countries, error, loading } = this.state;

        if (loading === true) {
            return <Loading text="Loading covid-19 data" />;
        }

        if (error) {
            return <p className="text-center error">{error}</p>;
        }

        return (
            <main className="stack main-stack animate-in">
                <div className="split">
                    <h1>Stats</h1>
                    <CountriesNav
                        selected={selectedCountry}
                        onUpdateCountry={this.updateCountry}
                    />
                </div>
                {error && <p className="text-center error">{error}</p>}

                {countries && <Table countries={countries} />}
            </main>
        );
    }
}

export default Stats;
