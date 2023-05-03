import React from 'react';


function Instructions({}) {
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

class CountryInput extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            country: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); 
        this.props.onSubmit(this.state.country);
    }
    
    handleChange(event) {
        this.setState({
            country: event.target.value,
        });
    }

    render() {
        return (
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
        );
    }
}

class Comparison extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countryOne: null,
            countryTwo: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, country) {
        this.setState({
            [id]: country,
        });
    }

    render() {
        const { countryOne, countryTwo } = this.state;
        const disabled = !countryOne || !countryTwo;

        return (
            <main className="stack main-stack animate-in">
                <div className="split">
                <h1>Countries</h1>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <a href='#' className={`btn primary ${disabled ? 'disabled' : ''}`}>
                    Comparison
                </a>
                </div>
                <section className="grid">
                    {countryOne === null ? (<
                        CountryInput 
                            label = "Country #1"
                            onSubmit={(country) => this.handleSubmit('countryOne', country)}
                        />
                    ) : null}
                    {countryTwo === null ? (<
                        CountryInput 
                            label = "Country #2"
                            onSubmit={(country) => this.handleSubmit('countryTwo', country)}
                        />) 
                    : null}
                </section>
                <Instructions />
            </main>
        );
    }
}

export default Comparison;