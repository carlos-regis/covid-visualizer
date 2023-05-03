import logo from './logo.svg';
import './App.css';
import CovidStats from './components/CovidStats';
import Comparison from './components/Comparison';

function App() {
  return (
      <div className='light'>
        <div className="container">
          <Comparison />
        </div>
      </div>
  );
}

export default App;
