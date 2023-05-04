import React from 'react';
import PropTypes from 'prop-types';
import { close } from './icons';
import ThemeContext from '../contexts/theme';
import { Link } from 'react-router-dom';

function Instructions() {
    const theme = React.useContext(ThemeContext);

    return (
        <section className="instructions-container">
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 countries</li>
                <li>Comparison</li>
                <li>Compare both countries</li>
            </ol>
        </section>
    );
}

function CountryInput({ onSubmit, label }) {
    const [country, setCountry] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(country);
    };
    const handleChange = (e) => setCountry(e.target.value);

    console.log(country);
    return (
        <form className="card" onSubmit={handleSubmit}>
            <label htmlFor="country" className="country-label">
                {label}
            </label>
            <div className="input-row">
                <input
                    type="text"
                    id="country"
                    placeholder="country"
                    autoComplete="off"
                    value={country}
                    onChange={handleChange}
                />
                <button className="btn link" type="submit" disabled={!country}>
                    Submit
                </button>
            </div>
        </form>
    );
}

function CountryPreview({ country, label, onReset }) {
    const theme = React.useContext(ThemeContext);

    return (
        <article className="card">
            <h3 className="country-label">{label}</h3>
            <div className="split">
                <div className="row gap-md">
                    <img
                        width={32}
                        height={32}
                        className="flag"
                        src={`https://github.com/${country}.png?size=200`}
                        alt={`Flag for ${country}`}
                    />
                    <a href={`https://github.com/${country}`} className="link">
                        {country}
                    </a>
                </div>
                <button onClick={onReset} className="btn secondary icon">
                    {close}
                </button>
            </div>
        </article>
    );
}

CountryPreview.propTypes = {
    country: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default function Comparison() {
    const [countryOne, setCountryOne] = React.useState(null);
    const [countryTwo, setCountryTwo] = React.useState(null);

    const handleSubmit = (id, country) =>
        id === 'countryOne' ? setCountryOne(country) : setCountryTwo(country);

    const handleReset = (id) =>
        id === 'countryOne' ? setCountryOne(null) : setCountryTwo(null);

    const disabled = !countryOne || !countryTwo;

    return (
        <main className="stack main-stack animate-in">
            <div className="split">
                <h1>Countries</h1>
                <Link
                    to={{
                        pathname: '/comparison/results',
                        search: `?countryOne=${countryOne}&countryTwo=${countryTwo}`,
                    }}
                    className={`btn primary ${disabled ? 'disabled' : ''}`}
                >
                    Comparison
                </Link>
            </div>
            <section className="grid">
                {countryOne === null ? (
                    <CountryInput
                        label="Country #1"
                        onSubmit={(country) =>
                            handleSubmit('countryOne', country)
                        }
                    />
                ) : (
                    <CountryPreview
                        label="Country #1"
                        country={countryOne}
                        onReset={() => handleReset('countryOne')}
                    />
                )}
                {countryTwo === null ? (
                    <CountryInput
                        label="Country #2"
                        onSubmit={(country) =>
                            handleSubmit('countryTwo', country)
                        }
                    />
                ) : (
                    <CountryPreview
                        label="Country #2"
                        country={countryTwo}
                        onReset={() => handleReset('countryTwo')}
                    />
                )}
            </section>
            <Instructions />
        </main>
    );
}
