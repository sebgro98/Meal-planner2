import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const FilterView = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());

    useEffect(() => {
        const fetchFilteredRecipes = async () => {
            const data = await presenter.getFilteredRecipes(selectedFilter); // Method to implement in presenter
            setFilteredRecipes(data);
        };

        fetchFilteredRecipes();
    }, [selectedFilter]);

    return (
        <View>
            <Text>Filter Recipes</Text>
            <Picker
                selectedValue={selectedFilter}
                onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            >
                {/* Picker items */}
            </Picker>
            {/* Render filtered recipes */}
        </View>
    );
};

export default FilterView;
