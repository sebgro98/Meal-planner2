class HomePagePresenter {
    static selectedMealIds = [];
    constructor(model, view) {
        this.model = model;
        this.view = view;

    }

    // Function to handle data fetching and updating the view
    async fetchData() {
        try {

            const data = await this.model.getRecipes(); // Replace with actual API call
            this.view.updateData(data); // Method in your view to update the UI
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
    }

    async applyFilters(filters) {
        try {
            const filteredData = await this.model.getFilteredRecipes(filters);
            this.view.updateData(filteredData);
            console.log("hello");
        } catch (error) {
            console.error('Error applying filter:', error);
        }
    }

    async getShoppingList() {
        // Implement logic to fetch the shopping list
        // This could be fetching data from a local store or an API call
        // e.g., return this.model.getShoppingList();
    }

    async getFavorites() {
        try {
            const favoriteMealDetails = [];

            for (const mealId of HomePagePresenter.selectedMealIds) {
                const mealDetails = await this.model.getMealDetails(mealId);
                favoriteMealDetails.push(mealDetails);
            }

            console.log('Favorite Meal Details', favoriteMealDetails);

            // If you want to navigate to a view with the favorite meal details, you can do it here
            // this.navigateToFavoriteView(favoriteMealDetails, navigation);

            return favoriteMealDetails;
        } catch (error) {
            console.error('Error fetching favorite meal details:', error);
            throw error;
        }
    }

    async getIngredients(query){
        try {
            const data = await this.model.getIngredients(query);
            return data;
        } catch (error) {
            console.error('Error getting shopping list:', error);
            // Handle error
        }
    }

    async saveShoppingList(shoppingList){
        await this.model.setShoppingList(shoppingList);
    }

    async loadShoppingList(){
        const temp = await this.model.getShoppingList();
        console.log('Presenter', temp);
        return temp;
    }

    async getMealDetailsWithID(mealId) {
        try {
            const mealDetails = await this.model.getMealDetails(mealId);
            console.log('Meal Details', mealDetails);
            return mealDetails;
        } catch (error) {
            console.error('Error fetching meal details:', error);
            throw error;
        }
    }


    async getMealDetails(mealId, navigation) {
        try {
            const mealDetails = await this.model.getMealDetails(mealId);
            console.log('Meal Details', mealDetails);
            this.navigateToMealView(mealDetails, navigation); // Use the navigation method in the presenter
            return mealDetails;
        } catch (error) {
            console.error('Error fetching meal details:', error);
            throw error;
        }
    }

    // Custom method to navigate to MealView from the presenter
    navigateToMealView(mealDetails, navigation) {
        if (this.view && navigation) {
            navigation.navigate('MealDetails', { mealDetails});
        } else {
            console.error('Navigation object not available in the presenter.');
        }
    }

}

export default HomePagePresenter;
