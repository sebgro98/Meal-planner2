import React, { useEffect, useState } from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

const MealView = ({ route }) => {
    const [mealDetails, setMealDetails] = useState(null);
    const presenter = new HomePagePresenter(new RecipeModel());
    const mealdet = route.params.mealDetails; // Get meal ID passed from previous screen
    console.log('meal view', route.params);

    useEffect(() => {
        const fetchMealDetails = async () => {
            const details = await presenter.getMealDetails(mealId); // Assuming this method exists
            setMealDetails(details);
        };

        fetchMealDetails();
    }, [mealId]);
    const { recipe } = route.params; // Passed data from previous screen

    return (
        <View>
            <Text>{recipe.title}</Text>
            {/* Display recipe details */}
        </View>
    );
};

export default MealView;
