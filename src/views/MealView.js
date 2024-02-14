import React, { useEffect, useState } from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import {View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Button} from 'react-native';

const MealView = ({ route }) => {
    const presenter = new HomePagePresenter(new RecipeModel());
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    const mealDetails = route.params.mealDetails; // Get meal ID passed from previous screen
    console.log('meal view', route.params);

    const addToFavorites = () => {
        // Check if the meal ID is already in the array
        if (!HomePagePresenter.selectedMealIds.includes(mealDetails.id)) {
            // Update the array of favorite meal IDs
            setFavoriteMeals((prevFavorites) => [...prevFavorites, mealDetails.id]);
            HomePagePresenter.selectedMealIds.push(mealDetails.id);
            console.log( HomePagePresenter.selectedMealIds);
        } else {
            console.log("Meal already in favorites");
        }
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.imageContainer}>
                <Image source={{ uri: mealDetails.image }} style={styles.mealImage} />
                <View style={styles.titleContainer}>
                    <Text style={styles.imageTitle}>{mealDetails.title}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.ingredientsContainer}>
                    <Text style={styles.detailsTitle}>Ingredients</Text>
                    <ScrollView>
                        {mealDetails.extendedIngredients.map((ingredient, index) => (
                            <Text key={index} style={styles.detailsText}>
                                {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}
                            </Text>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.nutritionContainer}>
                    <Text style={styles.detailsTitle}>Nutritional Information</Text>
                    <ScrollView>
                        <Text style={styles.detailsText}>Cook Time: {mealDetails.readyInMinutes} minutes</Text>
                        <Text style={styles.detailsText}>Health score: {mealDetails.healthScore}/100</Text>
                        <Text style={styles.detailsText}>Calories: {mealDetails.calories}</Text>
                        <Text style={styles.detailsText}>Carbs: {mealDetails.carbs}</Text>
                        <Text style={styles.detailsText}>Protein: {mealDetails.protein}</Text>
                        <Text style={styles.detailsText}>Fat: {mealDetails.fat}</Text>
                        <Text style={styles.detailsText}>Portions: {mealDetails.servings}</Text>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.stepsContainer}>
                <Text style={styles.detailsTitle}>Steps</Text>
                <ScrollView>
                    <Text style={styles.detailsText}>{mealDetails.instructions}</Text>
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>

                <Button
                    title="Add to Favorites"
                    onPress={addToFavorites}
                    color="#002e0c"
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3dd944',
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
        margin: 10,
    },
    mealImage: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 10,
    },
    titleContainer: {
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
    },
    imageTitle: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "bold",
    },
    detailsContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    ingredientsContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
    },
    nutritionContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    stepsContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    detailsTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailsText: {
        color: '#fff',
        marginBottom: 5,
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export default MealView;