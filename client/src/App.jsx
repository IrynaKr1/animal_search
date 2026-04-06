import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './App.css';
import PetsListPage from './pages/PetsListPage';
import CreatePetPage from './pages/CreatePetPage';

function App () {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/pets/create'>Add Missing Pet</Link>
            </li>
            <li>
              <Link to='/pets'>Pets List</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/' exact>
            Home
          </Route>
          <Route path='/pets/create'>
            <CreatePetPage />
          </Route>
          <Route path='/pets'>
            <PetsListPage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
