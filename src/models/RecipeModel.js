import MealAPI from '../utils/MealAPI';
import HomePagePresenter from "../presenters/HomePagePresenter";

class RecipeModel {
    static shoppingList =[];
    static selectedMealIds = [];

    removeFavIDs(mealID){
        RecipeModel.selectedMealIds = RecipeModel.selectedMealIds.filter((mealId) => mealId !== mealID);
    }

    addAFavIDs(mealID){
        RecipeModel.selectedMealIds.push(mealID);
    }

    isIDIncluded(mealID){
        if(RecipeModel.selectedMealIds.includes(mealID)){
            return true;
        }
            return false;
    }
    getFavs(){
        return RecipeModel.selectedMealIds;
    }




    async getRecipes(num) {
        // Fetch recipes using the MealAPI utility
        const data = await MealAPI.getRecipes(num);
        // You can add additional data manipulation here if needed
        return data;
    }

    async getRecipeDetails(id) {
        // Fetch recipe details
        const details = await MealAPI.getRecipeDetails(id);
        // Additional data manipulation
        return details;
    }

    async getFilteredRecipes(filters) {
        return await MealAPI.getFilteredRecipes(filters);
    }

    async setShoppingList(shoppingList){
        RecipeModel.shoppingList = shoppingList;
    }

    async getShoppingList() {
        // Fetch the shopping list
        try {
            const temp = RecipeModel.shoppingList
            console.log('model---------', temp);
            return temp;
        }
        catch(error){
            console.log('error loading shopping list', error)
            throw error
        }
    }

    async getFavorites() {
        // Fetch favorite recipes
        // e.g., return MealAPI.getFavorites();
    }

    async getIngredients(query){
        const ingredients = await MealAPI.getIngredients(query);

        return ingredients;
    }

    async getMealDetails(mealId) {
        // Implement the logic to fetch detailed information about a specific meal
        // This could be an API call or retrieving data from a local store
        try {
            const mealDetails = await MealAPI.getRecipeDetails(mealId); // Assuming MealAPI has this method
            const mealNutrition = await MealAPI.getRecipeNutrition(mealId);
            const mealSteps = await MealAPI.getRecipeInstructions(mealId);
            Object.assign(mealDetails, mealNutrition);
            Object.assign(mealDetails, mealSteps);
            return mealDetails;
        } catch (error) {
            console.error('Error fetching meal details from API:', error);
            throw error;
        }
    }

}

export default RecipeModel;
