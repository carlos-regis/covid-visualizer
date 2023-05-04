import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import Loading from './components/Loading';

const Results = React.lazy(() => import('./components/Results'));
const Stats = React.lazy(() => import('./components/Stats'));
const Comparison = React.lazy(() => import('./components/Comparison'));

function App() {
    const [theme, setTheme] = React.useState('light');
    const toggleTheme = () =>
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className="container">
                        <Nav toggleTheme={toggleTheme} />

                        <React.Suspense fallback={<Loading />}>
                            <Routes>
                                <Route exact path="/" element={<Stats />} />
                                <Route
                                    path="/comparison"
                                    element={<Comparison />}
                                />
                                <Route
                                    path="/comparison/results"
                                    element={<Results />}
                                />
                                <Route
                                    render={() => <h1>404 - Not Found</h1>}
                                />
                            </Routes>
                        </React.Suspense>
                    </div>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
