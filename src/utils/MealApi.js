import axios from 'axios';

const BASE_URL = 'https://api.yourrecipeprovider.com'; // Replace with your API's base URL

const MealAPI = {
    getRecipes: async (query) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/search`, { params: { query } });
            return response.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    },

    getRecipeDetails: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/recipes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            throw error;
        }
    },

    // Additional API methods as needed
};

export default MealAPI;
