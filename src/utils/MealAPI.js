import axios from 'axios';
import { apiKey } from './apiConfig';
const BASE_URL = 'https://api.spoonacular.com'; // Base URL for Spoonacular API
const apiKey = 'c195e435e05c4a2998db7ed737f2f208'; // Your API Key

const MealAPI = {
    getRecipes: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/complexSearch?apiKey=${apiKey}&number=10`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    },

    getRecipeDetails: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
                params: {
                    apiKey: apiKey // Include the API key in the request
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            throw error;
        }
    },

    // Implement additional methods as needed, e.g., to fetch random recipes:
    getRandomRecipes: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/random`, {
                params: {
                    apiKey: apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching random recipes:', error);
            throw error;
        }
    },

    getFilteredRecipes: async (filters) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
                params: { ...filters, apiKey: apiKey }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered recipes:', error);
            throw error;
        }
    },
};

export default MealAPI;
