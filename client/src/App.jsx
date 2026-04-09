import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import PetsListPage from './pages/PetsListPage'
import CreatePetPage from './pages/CreatePetPage'

function App () {
  return (
    <>
      <Router>
        <Navbar />
        <main>
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
        </main>
      </Router>
    </>
  )
}

export default App
