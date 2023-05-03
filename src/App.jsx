import logo from './logo.svg';
import './App.css';
import CovidStats from './components/CovidStats';
import Comparison from './components/Comparison';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="light">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<CovidStats />} />
                        <Route path="/comparison" element={<Comparison />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
