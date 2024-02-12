import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const ShoppingListView = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());

    useEffect(() => {
        const fetchShoppingList = async () => {
            const list = await presenter.getShoppingList(); // Method to implement in presenter
            setShoppingList(list);
        };

        fetchShoppingList();
    }, []);

    return (
        <View>
            <Text>Shopping List</Text>
            <FlatList
                data={shoppingList}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id}
            />
            {/* Add functionality to manage shopping list */}
        </View>
    );
};

export default ShoppingListView;
