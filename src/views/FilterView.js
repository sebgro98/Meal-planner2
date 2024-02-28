import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Slider from "@react-native-community/slider";
const FilterView = ({ onApplyFilters }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [maxCalories, setMaxCalories] = useState(500); // Default value
    const [prepTime, setPrepTime] = useState(30); // Default value in minutes

    const addFilter = (item) => {
        if (!selectedFilters.includes(item)) {
            setSelectedFilters([...selectedFilters, item]);
        }
        setSearchTerm('');
    };

    const removeFilter = (item) => {
        setSelectedFilters(selectedFilters.filter(filter => filter !== item));
    };

    const applyFilters = () => {
        // Only pass the selected text filters
        const textFilters = searchTerm ? [...selectedFilters, searchTerm] : selectedFilters;
        console.log("Filters to apply:", textFilters);
        onApplyFilters(textFilters, maxCalories, prepTime);
        setSearchTerm(''); // Clear the search term
        setSelectedFilters([]); // Optionally, clear the filters after applying
    };


    // Render function or component for search suggestions
    const renderSearchSuggestions = () => {
        // You can add logic here to display suggestions based on the searchTerm
        // For now, I'm just showing a simple example
        return searchTerm ? (
            <TouchableOpacity onPress={() => addFilter(searchTerm)} style={styles.suggestionItem}>
                <Text>{searchTerm}</Text>
            </TouchableOpacity>
        ) : null;
    };

    return (
        <View style={styles.container}>


            <TextInput
                style={styles.searchInput}
                onChangeText={setSearchTerm}
                value={searchTerm}
                placeholder="Search for recipes..."
            />

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1500}
                step={50}
                value={maxCalories}
                onValueChange={setMaxCalories}
            />
            <Text>Max Calories: {maxCalories} kcal</Text>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={120}
                step={5}
                value={prepTime}
                onValueChange={setPrepTime}
            />
            <Text>Prep Time: {prepTime} minutes</Text>

            {renderSearchSuggestions()}

            <View style={styles.filterContainer}>
                {selectedFilters.map((filter, index) => (
                    <View key={index} style={styles.filterTag}>
                        <Text style={styles.filterText}>{filter}</Text>
                        <TouchableOpacity onPress={() => removeFilter(filter)}>
                            <Text style={styles.removeButton}>x</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <Button mode="contained" onPress={applyFilters} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#007bff', // Updated for visibility
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        color: '#000', // Ensuring text is clearly visible
        backgroundColor: '#FAEBD7', // Light background for contrast
    },
    suggestionItem: {
        marginVertical: 10,
        backgroundColor: '#E8E8E8', // Light background for each item
        padding: 8,
        borderRadius: 4,
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    filterTag: {
        flexDirection: 'row',
        backgroundColor: '#007bff', // Blue background for filter tags
        borderRadius: 15,
        padding: 8,
        marginRight: 10, // Increased spacing
        marginBottom: 10, // Increased spacing
    },
    filterText: {
        color: '#fff', // White text for readability
    },
    removeButton: {
        color: '#fff',
        marginLeft: 5,
    },
    applyButton: {
        backgroundColor: '#8A2BE2', // Blue background for the button
        padding: 10,
        borderRadius: 5,
    },
    applyButtonText: {
        color: '#fff', // White text for readability
    },
});


export default FilterView;
