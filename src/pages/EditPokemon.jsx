import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPokemonById, updatePokemon } from '../services/api';
import './PokemonForm.css';

const EditPokemon = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: {
            english: '',
            japanese: '',
            chinese: '',
            french: ''
        },
        type: [],
        base: {
            HP: 50,
            Attack: 50,
            Defense: 50,
            SpecialAttack: 50,
            SpecialDefense: 50,
            Speed: 50
        },
        image: ''
    });

    const availableTypes = [
        'Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Poison',
        'Electric', 'Ground', 'Fairy', 'Fighting', 'Psychic',
        'Rock', 'Ghost', 'Ice', 'Dragon', 'Dark', 'Steel', 'Flying'
    ];

    useEffect(() => {
        fetchPokemon();
    }, [id]);

    const fetchPokemon = async () => {
        try {
            setLoading(true);
            const data = await getPokemonById(id);
            setFormData({
                name: data.name,
                type: data.type,
                base: data.base,
                image: data.image
            });
            setLoading(false);
        } catch (err) {
            setError('Pokémon non trouvé');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('name.')) {
            const nameField = name.split('.')[1];
            setFormData({
                ...formData,
                name: {
                    ...formData.name,
                    [nameField]: value
                }
            });
        } else if (name.startsWith('base.')) {
            const statField = name.split('.')[1];
            setFormData({
                ...formData,
                base: {
                    ...formData.base,
                    [statField]: parseInt(value) || 0
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleTypeChange = (type) => {
        setFormData((prev) => {
            const types = prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type];
            return { ...prev, type: types };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.english || !formData.name.french) {
            setError('Les noms en anglais et français sont requis');
            return;
        }
        if (formData.type.length === 0) {
            setError('Sélectionnez au moins un type');
            return;
        }
        if (!formData.image) {
            setError('L\'URL de l\'image est requise');
            return;
        }

        try {
            await updatePokemon(id, formData);
            navigate(`/pokemon/${id}`);
        } catch (err) {
            setError('Erreur lors de la modification du Pokémon');
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <Link to={`/pokemon/${id}`} className="btn btn-back">← Retour</Link>
                <h1>Modifier le Pokémon #{id}</h1>
            </div>

            <form onSubmit={handleSubmit} className="pokemon-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-section">
                    <h2>Noms</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nom Français *</label>
                            <input
                                type="text"
                                name="name.french"
                                value={formData.name.french}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom Anglais *</label>
                            <input
                                type="text"
                                name="name.english"
                                value={formData.name.english}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom Japonais</label>
                            <input
                                type="text"
                                name="name.japanese"
                                value={formData.name.japanese}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nom Chinois</label>
                            <input
                                type="text"
                                name="name.chinese"
                                value={formData.name.chinese}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Image</h2>
                    <div className="form-group">
                        <label>URL de l'image *</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="https://..."
                            required
                        />
                    </div>
                    {formData.image && (
                        <div className="image-preview">
                            <img src={formData.image} alt="Preview" />
                        </div>
                    )}
                </div>

                <div className="form-section">
                    <h2>Types *</h2>
                    <div className="type-selector">
                        {availableTypes.map((type) => (
                            <label key={type} className="type-checkbox">
                                <input
                                    type="checkbox"
                                    checked={formData.type.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                <span className={`type-badge type-${type.toLowerCase()}`}>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h2>Statistiques</h2>
                    <div className="stats-form">
                        <div className="form-group">
                            <label>HP: {formData.base.HP}</label>
                            <input
                                type="range"
                                name="base.HP"
                                min="1"
                                max="255"
                                value={formData.base.HP}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Attack: {formData.base.Attack}</label>
                            <input
                                type="range"
                                name="base.Attack"
                                min="1"
                                max="255"
                                value={formData.base.Attack}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Defense: {formData.base.Defense}</label>
                            <input
                                type="range"
                                name="base.Defense"
                                min="1"
                                max="255"
                                value={formData.base.Defense}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Special Attack: {formData.base.SpecialAttack}</label>
                            <input
                                type="range"
                                name="base.SpecialAttack"
                                min="1"
                                max="255"
                                value={formData.base.SpecialAttack}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Special Defense: {formData.base.SpecialDefense}</label>
                            <input
                                type="range"
                                name="base.SpecialDefense"
                                min="1"
                                max="255"
                                value={formData.base.SpecialDefense}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Speed: {formData.base.Speed}</label>
                            <input
                                type="range"
                                name="base.Speed"
                                min="1"
                                max="255"
                                value={formData.base.Speed}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <Link to={`/pokemon/${id}`} className="btn btn-cancel">Annuler</Link>
                    <button type="submit" className="btn btn-submit">
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPokemon;
