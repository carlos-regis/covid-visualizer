import React from 'react';
import PropTypes from 'prop-types';
import { hashtag } from './icons';
import Tooltip from './Tooltip';

function MoreInfo({
    country,
    todayCases,
    todayRecovered,
    todayDeaths,
    casesPerOneMillion,
    recoveredPerOneMillion,
    deathsPerOneMillion,
}) {
    return (
        <ul className="tooltip stack">
            <li className="split">
                <span>Country:</span> <span>{country}</span>
            </li>
            <li className="split">
                <span>Cases today:</span>
                <span>{todayCases.toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Recovered today:</span>
                <span>{todayRecovered.toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Deaths today:</span>
                <span>{todayDeaths.toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Cases per million:</span>
                <span>{casesPerOneMillion.toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Recovered per million:</span>
                <span>{recoveredPerOneMillion.toLocaleString()}</span>
            </li>
            <li className="split">
                <span>Deaths per million:</span>
                <span>{deathsPerOneMillion.toLocaleString()}</span>
            </li>
        </ul>
    );
}

MoreInfo.propTypes = {
    country: PropTypes.string.isRequired,
    todayCases: PropTypes.number.isRequired,
    todayRecovered: PropTypes.number,
    todayDeaths: PropTypes.number.isRequired,
    casesPerOneMillion: PropTypes.number.isRequired,
    recoveredPerOneMillion: PropTypes.number.isRequired,
    deathsPerOneMillion: PropTypes.number.isRequired,
};

function TableHead() {
    return (
        <thead>
            <tr>
                <th style={{ width: '5%' }}>{hashtag}</th>
                <th style={{ width: '45%' }}>Country</th>
                <th style={{ width: '15%' }}>Cases</th>
                <th style={{ width: '15%' }}>Recovered</th>
                <th style={{ width: '15%' }}>Deaths</th>
                <th style={{ width: '5%' }}>Flag</th>
            </tr>
        </thead>
    );
}

function TableRow({
    index,
    country,
    cases,
    recovered,
    deaths,
    countryInfo,
    todayCases,
    todayRecovered,
    todayDeaths,
    casesPerOneMillion,
    recoveredPerOneMillion,
    deathsPerOneMillion,
}) {
    const { flag } = countryInfo;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Tooltip
                    element={
                        <MoreInfo
                            country={country}
                            todayCases={todayCases}
                            todayRecovered={todayRecovered}
                            todayDeaths={todayDeaths}
                            casesPerOneMillion={casesPerOneMillion}
                            recoveredPerOneMillion={recoveredPerOneMillion}
                            deathsPerOneMillion={deathsPerOneMillion}
                        />
                    }
                >
                    <div className="row gap-md">
                        <img
                            width={32}
                            height={32}
                            className="flag"
                            src={flag}
                            alt={`Flag for ${country}`}
                        />
                        <a
                            href={`https://disease.sh/v3/covid-19/countries/${country}`}
                        >
                            {country}
                        </a>
                    </div>
                </Tooltip>
            </td>
            <td>{country}</td>
            <td>{cases.toLocaleString()}</td>
            <td>{recovered.toLocaleString()}</td>
            <td>{deaths.toLocaleString()}</td>
        </tr>
    );
}

TableRow.propTypes = {
    index: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    cases: PropTypes.number.isRequired,
    recovered: PropTypes.number.isRequired,
    deaths: PropTypes.number.isRequired,
    countryInfo: PropTypes.object.isRequired,
};

function Table({ countries }) {
    return (
        <table>
            <TableHead />
            <tbody>
                {countries.map((country, index) => {
                    return <TableRow key={index} index={index} {...country} />;
                })}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    countries: PropTypes.array.isRequired,
};

export default Table;
