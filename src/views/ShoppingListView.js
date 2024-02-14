import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TextInput, Image } from 'react-native';
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
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                // Handle error (e.g., display an error message to the user)
            }
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    };

    useEffect(() => {
        console.log('searchResults useeffect', searchResults);
    }, [searchResults]); // Log searchResults whenever it changes

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
            {searchResults && searchResults.results && searchResults.results.length > 0 ? (
                <FlatList
                    data={searchResults.results} // Use search results as data for FlatList
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }} // Form the complete image URL
                                style={{ width: 50, height: 50, marginRight: 10 }} // Adjust the width and height as needed
                            />
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
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
