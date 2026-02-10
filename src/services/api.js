import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Récupère la liste des Pokémon avec pagination
export const getAllPokemons = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}/pokemons?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw error;
    }
};

// Récupère un Pokémon par son ID
export const getPokemonById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/pokemons/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        throw error;
    }
};

// Recherche des Pokémon par nom
export const searchPokemonByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search?name=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error searching pokemon:', error);
        throw error;
    }
};

// Crée un nouveau Pokémon
export const createPokemon = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/pokemons`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating pokemon:', error);
        throw error;
    }
};

// Met à jour un Pokémon existant
export const updatePokemon = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/pokemons/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating pokemon:', error);
        throw error;
    }
};

// Supprime un Pokémon
export const deletePokemon = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/pokemons/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting pokemon:', error);
        throw error;
    }
};
