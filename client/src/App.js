import  './App.css';
import {  Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import AddVideogame from './components/AddVideogame/AddVideogame'
import Detail from './components/Detail'

function App() {
  return (
    <div className="App">
    <Routes>
          <Route exact path='/' element={LandingPage}/>
          <Route exact path = '/home' element = {Home} />
          <Route exact path= '/videogame' element = {AddVideogame} />
          <Route exact path= '/videogame/:id' element = {Detail} />
          <Route path="*" element={LandingPage} />
      </Routes>
    </div>
  );
}

export default App;
