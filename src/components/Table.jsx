import React from 'react';
import PropTypes from 'prop-types';
import { hashtag } from './icons';

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
    countryInfo
}) {
    const { flag } = countryInfo;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="row gap-md">
                    <img
                        width={32}
                        height={32}
                        className="flag"
                        src={flag}
                        alt={`Flag for ${country}`}
                    />
                    <a href={`https://disease.sh/v3/covid-19/countries/${country}`}>{country}</a>
                </div>
            </td>
            <td>{country}</td>
            <td>{cases}</td>
            <td>{recovered}</td>
            <td>{deaths}</td>
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