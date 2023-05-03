import React from 'react';
import { ReactDOM } from 'react-dom/client';
import logo from './logo.svg';
import './App.css';
import Stats from './components/Stats';
import Comparison from './components/Comparison';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Results from './components/Results';

class App extends React.Component {
    state = {
        theme: 'light',
    };
    toggleTheme = () => {
        this.setState(({ theme }) => ({
            theme: theme === 'light' ? 'dark' : 'light',
        }));
    };

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
                            <Route path="/results" element={<Results />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
