import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com'; // Base URL for Spoonacular API
import { apiKey } from './apiConfig';

const MealAPI = {
    getRecipes: async () => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10`);
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

    getIngredients: async (query) => {
        try {
            const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${query}&number=15&apiKey=${apiKey}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
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
    }

    // ... other methods ...
};

export default MealAPI;
