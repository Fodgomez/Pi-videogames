import './App.css';
import {  Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import AddVideogame from './components/AddVideogame'
import Detail from './components/Detail'

function App() {
  return (
    <div className="App">
    <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path = '/home' component = {Home} />
          <Route exact path= '/videogame' component = {AddVideogame} />
          <Route exact path= '/videogame/:id' component = {Detail} />
          <Route path="*" component={LandingPage} />
      </Switch>
      <h1>Henry Videogames</h1>
    </div>
  );
}

export default App;
