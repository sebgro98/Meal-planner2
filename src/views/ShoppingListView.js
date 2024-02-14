import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TextInput, Image, Button } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const ShoppingListView = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());

    /*useEffect(() => {
        const loadShoppingList = async () => {
            const temp = await presenter.loadShoppingList(); // Method to implement in presenter
            setShoppingList(temp);
            console.log("shopping list", temp);
        };

        loadShoppingList();
    }, []);*/

    const fetchIngredients = async (query) => {
        try {
            const data = await presenter.getIngredients(query);
            console.log('Testing', data);
            setSearchResults(data); // Update search results
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            // Handle error (e.g., display an error message to the user)
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            await fetchIngredients(query);
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    };

    const addToShoppingList = (ingredient) => {
        // Check if the ingredient already exists in the shopping list
        const existingIndex = shoppingList.findIndex(item => item.id === ingredient.id);

        // If the ingredient does not exist, add it to the shopping list with quantity 1
        if (existingIndex === -1) {
            setShoppingList(prevList => [...prevList, { ...ingredient, quantity: 1 }]);
        } else {
            // If the ingredient already exists, increase its quantity by 1
            setShoppingList(prevList => {
                const updatedList = [...prevList];
                updatedList[existingIndex].quantity += 1;
                return updatedList;
            });
        }
    };

    const removeFromShoppingList = (ingredient) => {
        setShoppingList(prevList => prevList.filter(item => item.id !== ingredient.id));
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
            <Text>Shopping List</Text>
            {shoppingList && shoppingList.length > 0 ? (
                <FlatList
                    data={shoppingList}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                            <Text>{item.name} Qty: {item.quantity}</Text>
                            <Button
                                title="Remove"
                                onPress={() => removeFromShoppingList(item)} // Call removeFromShoppingList
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>List is empty</Text>
            )}

            <Text>Search Results</Text>
            {searchResults && searchResults.results && searchResults.results.length > 0 ? (
                <FlatList
                    data={searchResults.results} // Use search results as data for FlatList
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                            <Text>{item.name}</Text>
                            <Button
                                title="Add"
                                onPress={() => addToShoppingList(item)}
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>Search List is empty</Text>
            )}
        </View>
    );
};

export default ShoppingListView;
