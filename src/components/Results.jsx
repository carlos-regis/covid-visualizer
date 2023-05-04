import React from 'react';
import { comparison } from '../utils/api';
import PropTypes from 'prop-types';
import Loading from './Loading';
import withSearchParams from './withSearchParams';
import { Link } from 'react-router-dom';

function Card({ profile }) {
    const {
        country,
        continent,
        countryInfo,
        cases,
        recovered,
        deaths,
        population,
    } = profile;

    const { flag } = countryInfo;

    return (
        <div className="card bg-light">
            <header className="split">
                <div>
                    <h4>
                        <a
                            href={`https://disease.sh/v3/covid-19/countries/${country}`}
                        >
                            {country}
                        </a>
                    </h4>
                    <p>{continent || 'unknown'}</p>
                </div>
                <img
                    className="flag large"
                    src={flag}
                    alt={`Flag for ${country}`}
                />
            </header>
            <ul className="stack">
                <li className="split">
                    <span>Population:</span>{' '}
                    <span>{population.toLocaleString()}</span>
                </li>
                <li className="split">
                    <span>Cases:</span> <span>{cases.toLocaleString()}</span>
                </li>
                <li className="split">
                    <span>Recovered:</span>{' '}
                    <span>{recovered.toLocaleString()}</span>
                </li>
                <li className="split">
                    <span>Deaths:</span> <span>{deaths.toLocaleString()}</span>
                </li>
            </ul>
        </div>
    );
}

Card.propTypes = {
    profile: PropTypes.shape({
        country: PropTypes.string.isRequired,
        continent: PropTypes.string.isRequired,
        countryInfo: PropTypes.object.isRequired,
        cases: PropTypes.number.isRequired,
        recovered: PropTypes.number.isRequired,
        deaths: PropTypes.number.isRequired,
        population: PropTypes.number.isRequired,
    }).isRequired,
};

class Results extends React.Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    };

    componentDidMount() {
        const searchParams = this.props.router.searchParams;
        const countryOne = searchParams.get('countryOne');
        const countryTwo = searchParams.get('countryTwo');

        comparison([countryOne, countryTwo])
            .then((countries) => {
                this.setState({
                    winner: countries[0],
                    loser: countries[1],
                    error: null,
                    loading: false,
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false,
                });
            });
    }

    render() {
        const { winner, loser, error, loading } = this.state;

        if (loading === true) {
            return <Loading text="Comparing countries" />;
        }

        if (error) {
            return <p className="text-center error">{error}</p>;
        }

        return (
            <main className="animate-in stack main-stack">
                <div className="split">
                    <h1>Results</h1>
                    <Link to="/comparison" className="btn secondary">
                        Reset
                    </Link>
                </div>
                <section className="grid">
                    <article className="results-container">
                        <Card profile={winner.profile} />
                        <p className="results">
                            <span>
                                {winner.score === loser.score
                                    ? 'Tie'
                                    : 'Winner'}{' '}
                                {winner.score.toLocaleString()}
                            </span>
                            {winner.score !== loser.score && (
                                <img
                                    width={80}
                                    src="https://ui.dev/images/certificate.svg"
                                    alt="Certificate"
                                />
                            )}
                        </p>
                    </article>
                    <article className="results-container">
                        <Card profile={loser.profile} />
                        <p className="results">
                            <span>
                                {winner.score === loser.score ? 'Tie' : 'Loser'}{' '}
                                {loser.score.toLocaleString()}
                            </span>
                            {winner.score !== loser.score}
                        </p>
                    </article>
                </section>
            </main>
        );
    }
}

export default withSearchParams(Results);
