import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const FavoritesView = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setFavorites });

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await presenter.getFavorites(); // Method to implement in presenter
            setFavorites(favs);
            console.log("my favs ", favs);
        };

        fetchFavorites();
    }, []);

    const handleRecipePress = (item) => {
        //const mealDetails = presenter.getMealDetailsWithID(item.id );// Navigate to a new screen or perform any action with the selected recipe information
        presenter.getMealDetails(item.id, navigation );
        //console.log('Selected Recipe:', item);
        //navigation.navigate('MealDetails', { item});
    };

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeItem2}>
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
                <View>
                    <Image source={{ uri: item.image }} style={styles.image2} />
                    <Text style={styles.title2}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <FlatList
                key={favorites.length}
                data={favorites}
                renderItem={renderRecipe}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            {/* Render favorite recipes */}
        </View>
    );
};

const styles = StyleSheet.create({
    recipeItem2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#c1ecc1',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        width: '48%',
        marginRight: '2%',
    },
    image2: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    title2: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FavoritesView;
