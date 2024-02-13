import React, { useEffect, useState } from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

const MealView = ({ navigation }) => {
    const [mealDetails, setMealDetails] = useState(null);
    const presenter = new HomePagePresenter(new RecipeModel());


    const meal = {
        name: 'Trump pizza',
        image: 'trump.jpg',
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
        preparationTime: 30,
        calories: 500,
        carbs: 50,
        protein: 20,
        fat: 10,
        steps: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity  style={styles.header} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.headerText}>
                    Go back
                </Text>
            </TouchableOpacity >

            <View style={styles.imageContainer}>
                <Image source={require('../../assets/trump.jpg')} style={styles.mealImage} />
                <View style={styles.titleContainer}>
                    <Text style={styles.imageTitle}>{meal.name}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.ingredientsContainer}>
                    <Text style={styles.detailsTitle}>Ingredients</Text>
                    <ScrollView>
                        {meal.ingredients.map((ingredient, index) => (
                            <Text key={index} style={styles.detailsText}>
                                {ingredient}
                            </Text>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.nutritionContainer}>
                    <Text style={styles.detailsTitle}>Nutritional Information</Text>
                    <ScrollView>
                        <Text style={styles.detailsText}>Cook Time: {meal.preparationTime} minutes</Text>
                        <Text style={styles.detailsText}>Calories: {meal.calories}</Text>
                        <Text style={styles.detailsText}>Carbs: {meal.carbs}g</Text>
                        <Text style={styles.detailsText}>Protein: {meal.protein}g</Text>
                        <Text style={styles.detailsText}>Fat: {meal.fat}g</Text>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.stepsContainer}>
                <Text style={styles.detailsTitle}>Steps</Text>
                <ScrollView>
                    {meal.steps.map((step, index) => (
                        <Text key={index} style={styles.detailsText}>
                            {index}. {step}
                        </Text>
                    ))}
                </ScrollView>
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
});

export default MealView;