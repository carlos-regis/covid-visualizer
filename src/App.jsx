import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Loading from './components/Loading';

const Results = React.lazy(() => import('./components/Results'));
const Stats = React.lazy(() => import('./components/Stats'));
const Comparison = React.lazy(() => import('./components/Comparison'));

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
                        <React.Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Stats />} />
                                <Route
                                    path="/comparison"
                                    element={<Comparison />}
                                />
                                <Route path="/results" element={<Results />} />
                            </Routes>
                        </React.Suspense>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
