import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const FavoritesView = () => {
    const [favorites, setFavorites] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await presenter.getFavorites(); // Method to implement in presenter
            setFavorites(favs);
        };

        fetchFavorites();
    }, []);

    return (
        <View>
            <Text>Favorites</Text>
            <FlatList
                data={favorites}
                renderItem={({ item }) => <Text>{item.title}</Text>}
                keyExtractor={item => item.id}
            />
            {/* Render favorite recipes */}
        </View>
    );
};

export default FavoritesView;
