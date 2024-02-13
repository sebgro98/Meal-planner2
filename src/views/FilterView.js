// FilterView.js

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

import RNPickerSelect from 'react-native-picker-select';

const FilterView = () => {
    const [selectedMealType, setSelectedMealType] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedPrepTime, setSelectedPrepTime] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: () => {} });

    const applyFilters = () => {
        const filters = {
            category: selectedCategory,
            // ... other filter criteria
        };
        presenter.applyFilters(filters);
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedCategory(value)}
                items={[
                    { label: 'Breakfast', value: 'breakfast' },
                    { label: 'Lunch', value: 'lunch' },
                    { label: 'Dinner', value: 'dinner' },
                    // ... add other categories
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a category', value: null }}
            />

            {/* Diet Picker */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedDiet(value)}
                items={[
                    { label: 'Vegan', value: 'vegan' },
                    { label: 'Keto', value: 'keto' },
                    { label: 'Vegetarian', value: 'vegetarian' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a diet', value: null }}
            />

            {/* Prep Time Picker */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedPrepTime(value)}
                items={[
                    { label: 'Less than 30 min', value: '>30' },
                    { label: '45 min', value: '45' },
                    { label: '30 min', value: '30' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select prep time', value: null }}
            />

            <RNPickerSelect
                onValueChange={(value) => setSelectedMealType(value)}
                items={[
                    { label: 'Chicken', value: 'chicken' },
                    { label: 'Minced Meat', value: 'minced meat' },
                    { label: 'Stake', value: 'stake' },
                    { label: 'Sausage', value: 'sausage' },
                    { label: 'beef', value: 'beef' },
                    { label: 'pork', value: 'pork' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Meal Type', value: null }}
            />

            {/* Apply Filters Button */}
            <View style={styles.buttonContainer}>
                <Button title="Apply Filters" onPress={applyFilters} color="#007bff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // You can change the color based on your app theme
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Adjust the color to fit your app's design
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: '#007bff', // Example button color
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    pickerContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
    },
    // ... other styles you might need
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: 'gray',
    },
    iconContainer: {
        top: 5,
        right: 15,
    },
});
export default FilterView;
