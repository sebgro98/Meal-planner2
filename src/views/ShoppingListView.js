import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const ShoppingListView = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const presenter = new HomePagePresenter(new RecipeModel());

    const fetchIngredients = async (query) => {
        try {
            const data = await presenter.getIngredients(query);
            console.log('Testing', data);
            setSearchResults(data); // Update search results
            console.log('searchResults', searchResults);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            // Handle error (e.g., display an error message to the user)
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            // Call fetchIngredients to fetch data
            try {
                await fetchIngredients(query); // Wait for fetchIngredients to complete
                console.log('searchResults2', searchResults);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                // Handle error (e.g., display an error message to the user)
            }
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    };

    return (
        <View>
            <Text>Search ingredient</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={handleSearch}
                value={searchQuery}
                placeholder="Search"
            />
            <Text>Search Results</Text>
            {searchResults && searchResults.length > 0 ? (
            <FlatList
                data={searchResults} // Use search results as data for FlatList
                renderItem={({ item }) => <Text>{item.name()}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />            ) : (
                <Text>Search List is empty</Text>
            )}
            <Text>Shopping List</Text>
            {shoppingList && shoppingList.length > 0 ? (
                <FlatList
                    data={shoppingList}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>Shopping List is empty</Text>
            )}
        </View>
    );
};

export default ShoppingListView;
