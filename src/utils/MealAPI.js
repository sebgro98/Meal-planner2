import axios from 'axios';
import { apiKey } from './apiConfig';
const BASE_URL = 'https://api.spoonacular.com'; // Base URL for Spoonacular API

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

    getFilteredRecipes: async (filters) => {
        try {
            const { category, diet, mealType, prepTime, maxCalories, ingredients } = filters;
            console.log("This is big mommy",filters)
            console.log(`${BASE_URL}/recipes/complexSearch?includeIngredients=${mealType},${ingredients}&diet=${diet}&maxReadyTime=${prepTime}&apiKey=${apiKey}&type=${category}&maxCalories=${maxCalories}`)
            const response = await axios.get(`${BASE_URL}/recipes/complexSearch?includeIngredients=${mealType},${ingredients}&diet=${diet}&maxReadyTime=${prepTime}&apiKey=${apiKey}&type=${category}&maxCalories=${maxCalories}`);
            //const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?includeIngredients=&diet=vegan&maxReadyTime=45&apiKey=83c2ce9b1a1343358a4dec5ecc0b25a7`)
            return response.data;
        } catch (error) {
            console.error('Error fetching filtered recipes:', error);
            throw error;
        }
    },
};

export default MealAPI;
