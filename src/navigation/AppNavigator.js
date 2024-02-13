import { createStackNavigator } from '@react-navigation/stack';
import HomePageView from '../views/HomePageView';
import FavoritesView from '../views/FavoritesView';
import MealView from '../views/MealView';
import ShoppingListView from '../views/ShoppingListView';
import FilterView from '../views/FilterView';
// ... import other views

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Filter">
            <Stack.Screen name="Home" component={HomePageView} />
            <Stack.Screen name="Favorites" component={FavoritesView} />
            <Stack.Screen name="MealDetails" component={MealView} />
            <Stack.Screen name="ShoppingList" component={ShoppingListView} />
            <Stack.Screen name="Filter" component={FilterView} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
