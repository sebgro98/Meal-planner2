import React, { useEffect, useState } from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import {Button, TextInput, View} from "react-native";

const HomePageView = () => {
    const [recipes, setRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());

    useEffect(() => {
        const fetchData = async () => {
            const data = await presenter.fetchData();
            setRecipes(data); // Update the state with fetched data
        };

        fetchData();
    }, []);

    return (
        <View>
            <Text>Meal Planner</Text>
            <TextInput placeholder="Search for recipes..." />
            {/* Implement a list or grid for categories */}
            {/* Feature a recipe of the day or similar */}
            {/* Navigation buttons to other views */}
            <Button
                title="Go to Favorites"
                onPress={() => navigation.navigate('Favorites')}
            />
            {/* ... other navigation buttons */}
        </View>
    );
};

export default HomePageView;
