import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id" component={CountryDetail} />
      <Route exact path="/create" component={CreateActivity} />
    </div>
  );
}

export default App;
