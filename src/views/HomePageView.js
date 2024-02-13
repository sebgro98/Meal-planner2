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
            <FlatList
                data={recipes.results}
                renderItem={renderRecipe}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    recipeItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
    },
});

export default HomePageView;
