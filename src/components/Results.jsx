import React from 'react';
import { comparison } from '../utils/api';

class Results extends React.Component {
    componentDidMount() {
        const { countryOne, countryTwo } = this.props;

        comparison([countryOne, countryTwo]).then((countries) => {
          console.log('data', countries);
        });
    }

    render() {
        return (
            <div>
                Results
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }
}

export default Results;