import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import CreatePokemon from './pages/CreatePokemon';
import EditPokemon from './pages/EditPokemon';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/create" element={<CreatePokemon />} />
          <Route path="/edit/:id" element={<EditPokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
