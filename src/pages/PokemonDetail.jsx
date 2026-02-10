import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPokemonById, deletePokemon } from '../services/api';
import DeleteModal from '../components/DeleteModal';
import './PokemonDetail.css';

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchPokemon();
    }, [id]);

    const fetchPokemon = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPokemonById(id);
            setPokemon(data);
            setLoading(false);
        } catch (err) {
            setError('Pokémon non trouvé');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePokemon(id);
            navigate('/');
        } catch (err) {
            setError('Erreur lors de la suppression');
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error">{error}</p>
                <Link to="/" className="btn btn-back">Retour à la liste</Link>
            </div>
        );
    }

    if (!pokemon) {
        return null;
    }

    return (
        <div className="pokemon-detail-container">
            <div className="detail-header">
                <Link to="/" className="btn btn-back">← Retour</Link>
                <div className="detail-actions">
                    <Link to={`/edit/${pokemon.id}`} className="btn btn-edit">
                        ✏️ Modifier
                    </Link>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="btn btn-delete"
                    >
                        🗑️ Supprimer
                    </button>
                </div>
            </div>

            <div className="detail-content">
                <div className="detail-main">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name.french}
                        className="detail-image"
                    />
                    <div className="detail-info">
                        <h1>#{pokemon.id} - {pokemon.name.french}</h1>
                        <div className="names">
                            <p><strong>Anglais:</strong> {pokemon.name.english}</p>
                            <p><strong>Japonais:</strong> {pokemon.name.japanese}</p>
                            <p><strong>Chinois:</strong> {pokemon.name.chinese}</p>
                        </div>
                        <div className="types">
                            <strong>Type(s):</strong>
                            {pokemon.type.map((type, index) => (
                                <span key={index} className={`type-badge type-${type.toLowerCase()}`}>
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="detail-stats">
                    <h2>Statistiques</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">HP</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.HP / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.HP}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Attack</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.Attack / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.Attack}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Defense</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.Defense / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.Defense}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Sp. Attack</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.SpecialAttack / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.SpecialAttack}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Sp. Defense</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.SpecialDefense / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.SpecialDefense}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Speed</span>
                            <div className="stat-bar-container">
                                <div
                                    className="stat-bar"
                                    style={{ width: `${(pokemon.base.Speed / 255) * 100}%` }}
                                ></div>
                            </div>
                            <span className="stat-value">{pokemon.base.Speed}</span>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                pokemonName={pokemon.name.french}
            />
        </div>
    );
};

export default PokemonDetail;
