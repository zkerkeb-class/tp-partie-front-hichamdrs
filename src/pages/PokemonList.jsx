import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPokemons, searchPokemonByName } from '../services/api';
import './PokemonList.css';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPokemons();
    }, [currentPage]);

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllPokemons(currentPage);
            setPokemons(data.pokemons);
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des Pokémon');
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchPokemons();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const results = await searchPokemonByName(searchTerm);
            setPokemons(results);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la recherche');
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="pokemon-list-container">
            <h1>Pokédex</h1>

            <div className="actions-bar">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Rechercher un Pokémon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn btn-search">Rechercher</button>
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm('');
                                fetchPokemons();
                            }}
                            className="btn btn-clear"
                        >
                            Effacer
                        </button>
                    )}
                </form>

                <Link to="/create" className="btn btn-create">
                    + Créer un Pokémon
                </Link>
            </div>

            <div className="pokemon-grid">
                {pokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="pokemon-card"
                        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
                    >
                        <img
                            src={pokemon.image}
                            alt={pokemon.name.french}
                            className="pokemon-image"
                        />
                        <h3>#{pokemon.id} - {pokemon.name.french}</h3>
                        <p className="pokemon-name-en">{pokemon.name.english}</p>
                        <div className="pokemon-types">
                            {pokemon.type.map((type, index) => (
                                <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {!searchTerm && (
                <div className="pagination">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="btn btn-pagination"
                    >
                        ← Précédent
                    </button>
                    <span className="page-info">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="btn btn-pagination"
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
