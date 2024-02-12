import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageView from '../views/HomePageView';
import FavoritesView from '../views/FavoritesView';
// ... import other views

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePageView} />
            <Stack.Screen name="Favorites" component={FavoritesView} />
            // ... other screens
        </Stack.Navigator>
    );
};

export default AppNavigator;
