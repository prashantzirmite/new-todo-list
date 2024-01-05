import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLoadComponent from './components/AppLoadComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <AppLoadComponent />
      </Router>
    </div>
  );
}

export default App;
