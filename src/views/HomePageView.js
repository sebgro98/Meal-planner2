import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, StyleSheet, Button, TextInput} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const HomePageView = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setRecipes });

    useEffect(() => {
        presenter.fetchData();
    }, []);

    const renderRecipe = ({ item }) => (

        <View style={styles.recipeItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Meal Planner</Text>
            <TextInput placeholder="Search for recipes..." />
            {/* Implement a list or grid for categories */}
            {/* Feature a recipe of the day or similar */}
            {/* Navigation buttons to other views */}
            <Button
                title="Go to Favorites"
                onPress={() => navigation.navigate('Favorites')}
            />
            {/* ... other navigation buttons */}
            {recipes.results && (

                    <FlatList
                        key={recipes.results.length} // Add a key prop based on data length
                        data={recipes.results}
                        renderItem={renderRecipe}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2} // Set the number of columns to 2
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
        flexDirection: 'column', // Change to column for a better mobile display
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
        width: '48%', // Set a width to fit two cards in a row with some spacing
        marginRight: '2%', // Add some margin between the cards
    },
    image: {
        width: '100%',
        height: 120, // Adjust the height as per your preference
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold', // Make the title bold
        textAlign: 'center',
    },
});

export default HomePageView;
