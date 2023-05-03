import React from 'react';
import { ReactDOM } from 'react-dom/client';
import logo from './logo.svg';
import './App.css';
import Stats from './components/Stats';
import Comparison from './components/Comparison';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';

class App extends React.Component {
    constructor(prop) {
        super(prop);

        this.state = {
            theme: 'light',
        };

        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        this.setState(({ theme }) => ({
            theme: theme === 'light' ? 'dark' : 'light',
        }));
    }

    render() {
        return (
            <Router>
                <div className={this.state.theme}>
                    <div className="container">
                        <Nav
                            theme={this.state.theme}
                            toggleTheme={this.toggleTheme}
                        />
                        <Routes>
                            <Route path="/" element={<Stats />} />
                            <Route
                                path="/comparison"
                                element={<Comparison />}
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
