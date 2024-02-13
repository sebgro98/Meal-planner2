import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const HomePageView = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setRecipes });

    useEffect(() => {
        presenter.fetchData();
    }, []);

    const handleRecipePress = (item) => {
        presenter.getMealDetails(item.id, navigation );// Navigate to a new screen or perform any action with the selected recipe information
        console.log('Selected Recipe:', item);
    };

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeItem}>
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
            <View>
                <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
            </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Meal Planner</Text>
            <TextInput placeholder="Search for recipes..." />
            <Button
                title="Go to Favorites"
                onPress={() => navigation.navigate('Favorites')}
            />
            {recipes.results && (
                <FlatList
                    key={recipes.results.length}
                    data={recipes.results}
                    renderItem={renderRecipe}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    recipeItem: {
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
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePageView;
