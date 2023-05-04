import React from 'react';
import PropTypes from 'prop-types';
import { close } from './icons';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

function Instructions() {
    return (
        <ThemeConsumer>
            {(theme) => (
                <section className="instructions-container">
                    <h2>Instructions</h2>
                    <ol>
                        <li>Enter 2 countries</li>
                        <li>Comparison</li>
                        <li>Compare both countries</li>
                    </ol>
                </section>
            )}
        </ThemeConsumer>
    );
}

class CountryInput extends React.Component {
    state = {
        country: '',
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.country);
    };

    handleChange = (event) => {
        this.setState({
            country: event.target.value,
        });
    };

    render() {
        return (
            <ThemeConsumer>
                {(theme) => (
                    <form className="card" onSubmit={this.handleSubmit}>
                        <label htmlFor="country" className="country-label">
                            {this.props.label}
                        </label>
                        <div className="input-row">
                            <input
                                type="text"
                                id="country"
                                placeholder="country"
                                autoComplete="off"
                                value={this.state.country}
                                onChange={this.handleChange}
                            />
                            <button
                                className="btn link"
                                type="submit"
                                disabled={!this.state.country}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        );
    }
}

function CountryPreview({ country, label, onReset }) {
    return (
        <ThemeConsumer>
            {(theme) => (
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
                            <a
                                href={`https://github.com/${country}`}
                                className="link"
                            >
                                {country}
                            </a>
                        </div>
                        <button
                            onClick={onReset}
                            className="btn secondary icon"
                        >
                            {close}
                        </button>
                    </div>
                </article>
            )}
        </ThemeConsumer>
    );
}

CountryPreview.propTypes = {
    country: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
};

class Comparison extends React.Component {
    state = {
        countryOne: null,
        countryTwo: null,
    };

    handleSubmit = (id, country) => {
        this.setState({
            [id]: country,
        });
    };

    handleReset = (id) => {
        this.setState({
            [id]: null,
        });
    };

    render() {
        const { countryOne, countryTwo } = this.state;
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
                                this.handleSubmit('countryOne', country)
                            }
                        />
                    ) : (
                        <CountryPreview
                            label="Country #1"
                            country={countryOne}
                            onReset={() => this.handleReset('countryOne')}
                        />
                    )}
                    {countryTwo === null ? (
                        <CountryInput
                            label="Country #2"
                            onSubmit={(country) =>
                                this.handleSubmit('countryTwo', country)
                            }
                        />
                    ) : (
                        <CountryPreview
                            label="Country #2"
                            country={countryTwo}
                            onReset={() => this.handleReset('countryTwo')}
                        />
                    )}
                </section>
                <Instructions />
            </main>
        );
    }
}

export default Comparison;
