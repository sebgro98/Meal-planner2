// FilterView.js

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from "react-native-multiple-select";

const FilterView = ({ onApplyFilters }) => {
    const [selectedMealType, setSelectedMealType] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedPrepTime, setSelectedPrepTime] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaxCalories, setSelectedMaxCalories] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const applyFilters = () => {
        const filters = {
            mealType: selectedMealType,
            diet: selectedDiet,
            prepTime: selectedPrepTime,
            category: selectedCategory,
            maxCalories: selectedMaxCalories,
            ingredients: selectedIngredients,

        };
        // Assuming presenter has a method `applyFilters`
        onApplyFilters(filters);
    };

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedCategory(value)}
                items={[
                    { label: 'Breakfast', value: 'breakfast' },
                    { label: 'Dessert', value: 'dessert' },
                    { label: 'Main course', value: 'maincourse' },
                    { label: 'Snack', value: 'snack' },
                    { label: 'Soup', value: 'soup' },

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
                    { label: 'Gluten Free', value: 'glutenfree' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a diet', value: null }}
            />

            {/* Prep Time Picker */}
            <RNPickerSelect
                onValueChange={(value) => setSelectedPrepTime(value)}
                items={[
                    { label: '20 min', value: '20' },
                    { label: '45 min', value: '45' },
                    { label: '30 min', value: '30' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select prep time', value: null }}
            />

            <MultiSelect
                hideTags
                items={[
                    { name: 'Chicken', id: 'chicken' },
                    { name: 'Sausage', id: 'sausage' },
                    { name: 'beef', id: 'beef' },
                    { name: 'pork', id: 'pork' },
                    { name: 'Pasta', id: 'pasta' },
                    { name: 'Potatoes', id: 'potatoes' },
                ]}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedMealType}
                selectedItems={selectedMealType}
                selectText="Meal type"
                searchInputPlaceholderText="Search Meal type"
                onChangeInput={(text) => console.log(text)}
                tagBorderColor="#007bff"
                tagTextColor="#007bff"
                selectedItemTextColor="#007bff"
                selectedItemIconColor="#007bff"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#007bff' }}
                submitButtonColor="#007bff"
                submitButtonText="Submit"
                styleDropdownMenu={{
                    marginTop: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    maxHeight: 50, // Set a maximum height for the dropdown menu
                    overflow: 'hidden',// Change border color to black
                }}
                styleMainWrapper={{
                    borderWidth: 1,
                    borderColor: 'black', // Change border color to black
                    borderRadius: 5,
                    padding: 5,
                }}
                styleInputGroup={{
                    marginTop: 10,
                }}
                styleDropdownContainer={{
                    marginTop: 10,
                }}
                selectedItemContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#007bff', // Change selected item border color
                    borderRadius: 5,
                    padding: 10,
                }}
            />

            <RNPickerSelect
                onValueChange={(value) => setSelectedMealType(value)}
                items={[
                    { label: 'Chicken', value: 'chicken' },
                    { label: 'Sausage', value: 'sausage' },
                    { label: 'beef', value: 'beef' },
                    { label: 'pork', value: 'pork' },
                    { label: 'Pasta', value: 'pasta' },
                    { label: 'Potatoes', value: 'potatoes' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Meal Type', value: null }}
            />

            <RNPickerSelect
                onValueChange={(value) => setSelectedMaxCalories(value)}
                items={[
                    { label: '250', value: '250' },
                    { label: '350', value: '350' },
                    { label: '450', value: '450' },
                    { label: '550', value: '550' },
                    { label: '650', value: '650' },
                    { label: '800', value: '800' },
                    { label: '1000', value: '1000' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: 'Max Calories', value: null }}
            />

            <MultiSelect
                hideTags
                items={[
                    { id: 'tomato', name: 'Tomato' },
                    { id: 'cheese', name: 'Cheese' },
                    { id: 'egg', name: 'Egg' },
                    { id: 'broccoli', name: 'Broccoli' },
                ]}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedIngredients}
                selectedItems={selectedIngredients}
                selectText="Select Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                onChangeInput={(text) => console.log(text)}
                tagBorderColor="#007bff"
                tagTextColor="#007bff"
                selectedItemTextColor="#007bff"
                selectedItemIconColor="#007bff"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#007bff' }}
                submitButtonColor="#007bff"
                submitButtonText="Submit"
                styleDropdownMenu={{
                    marginTop: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    maxHeight: 50, // Set a maximum height for the dropdown menu
                    overflow: 'hidden',// Change border color to black
                }}
                styleMainWrapper={{
                    borderWidth: 1,
                    borderColor: 'black', // Change border color to black
                    borderRadius: 5,
                    padding: 5,
                }}
                styleInputGroup={{
                    marginTop: 10,
                }}
                styleDropdownContainer={{
                    marginTop: 10,
                }}
                selectedItemContainerStyle={{
                    borderWidth: 1,
                    borderColor: '#007bff', // Change selected item border color
                    borderRadius: 5,
                    padding: 10,
                }}
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
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },

    pickerContainer: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
    },

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
