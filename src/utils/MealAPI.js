import axios from 'axios';
import { apiKey } from './apiConfig';
const BASE_URL = 'https://api.spoonacular.com'; // Base URL for Spoonacular API

const MealAPI = {
    getRecipes: async (num) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/complexSearch?apiKey=${apiKey}&number=${num}`);
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

    getRecipeNutrition: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/${id}/nutritionWidget.json`, {
                params: {
                    apiKey: apiKey
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching nutrition details:', error);
            throw error;
        }
    },

    getRecipeInstructions: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/${id}/analyzedInstructions`, {
                params: {
                    apiKey: apiKey
                }
            });
            return response.data[0];
        } catch (error) {
            console.error('Error fetching instruction details:', error);
            throw error;
        }
    },

    getIngredients: async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/food/ingredients/search?query=${query}&apiKey=${apiKey}&number=10`);
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
    },

    getFilteredRecipes: async (filters, maxCalories, prepTime) => {
        try {
            let queryTerms = filters.join(','); // Join the filters with commas

            let apiUrl = `${BASE_URL}/recipes/complexSearch?query=${queryTerms}&apiKey=${apiKey}`;


            if (maxCalories) {
                apiUrl += `&maxCalories=${maxCalories}`;
            }

            // Append prepTime to the URL if it's provided and not empty
            if (prepTime) {
                apiUrl += `&maxReadyTime=${prepTime}`;
            }

            // You can add additional parameters here if needed
            // For example, if you have other specific filters like maxCalories, you can append them to the URL

            console.log("API URL:", apiUrl);

            const response = await axios.get(apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered recipes:', error);
            throw error;
        }
    }

};

export default MealAPI;
