import React, {useEffect, useState, useRef } from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    FlatList,
    TextInput,
    PanResponder, Animated,
} from 'react-native';
import {Card, Paragraph, Portal, Provider, Title, Button} from "react-native-paper";

const MealView = ({ route }) => {
    const [shoppingList, setShoppingList] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [isAddIngredientsVisible, setisAddIngredientsVisible] = useState(false);
    const [ingredientsData, setIngredientsData] = useState([]);
    const mealDetails = route.params.mealDetails; // Get meal ID passed from previous screen
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the meal ID is already in the array
        setIsFavorite(HomePagePresenter.selectedMealIds.includes(mealDetails.id));
    }, [mealDetails.id])


    useEffect(() => {
        const data = mealDetails.extendedIngredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitShort,
        }));
        setIngredientsData(data);
    }, []);

    const toggleFavorite = () => {
        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favoriteMeals.filter((mealId) => mealId !== mealDetails.id);
            setFavoriteMeals(updatedFavorites);
            HomePagePresenter.selectedMealIds = updatedFavorites;
        } else {
            // Add to favorites
            setFavoriteMeals((prevFavorites) => [...prevFavorites, mealDetails.id]);
            HomePagePresenter.selectedMealIds.push(mealDetails.id);
        }

        // Toggle the isFavorite state
        setIsFavorite(!isFavorite);
    };

    const swipeThreshold = 100; // Adjust this threshold as needed
    const swipeAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx > 5,
            onPanResponderMove: (evt, gestureState) => {
                swipeAnim.setValue(gestureState.dx);
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > swipeThreshold) {
                    Animated.timing(swipeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        route.params.navigate('Home');
                    });
                } else {
                    Animated.timing(swipeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;


    function toggleAddIngredientsVisibility() {
        setisAddIngredientsVisible(!isAddIngredientsVisible);
    }

    function setIngredientAmount(id, amount) {
        const data = ingredientsData.map((ingredient) => {
            if (ingredient.id === id) return {...ingredient, amount: amount};
            return ingredient;
        });
        setIngredientsData(data);
    }

    function addIngredient(id, amount) {
        console.log("adding ingredient: ", id, "amount: ", amount);
    }

    return (
        <Provider>
            <Animated.View
                style={[styles.container, {transform: [{translateX: swipeAnim}]}]} {...panResponder.panHandlers}>
                <ScrollView style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: mealDetails.image}} style={styles.mealImage}/>
                        <Text style={styles.title}>{mealDetails.title}</Text>
                    </View>

                    {/* Ingredients */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {mealDetails.extendedIngredients.map((ingredient, index) => (
                            <Text key={index} style={styles.paragraph}>
                                {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}
                            </Text>
                        ))}
                    </View>

                    {/* Nutritional Information */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nutritional Information</Text>
                        <Text style={styles.paragraph}>Cook Time: {mealDetails.readyInMinutes} minutes</Text>
                        <Text style={styles.paragraph}>Health score: {mealDetails.healthScore}/100</Text>
                        <Text style={styles.paragraph}>Calories: {mealDetails.calories}</Text>
                        {mealDetails.extendedIngredients.map((ingredient, index) => (
                            <Text key={index} style={styles.paragraph}>
                                {ingredient.measures.metric.amount} {ingredient.measures.metric.unitShort} {ingredient.name}
                            </Text>
                        ))}
                        <Text style={styles.paragraph}>Carbs: {mealDetails.carbs}</Text>
                        <Text style={styles.paragraph}>Protein: {mealDetails.protein}</Text>
                        <Text style={styles.paragraph}>Fat: {mealDetails.fat}</Text>
                        <Text style={styles.paragraph}>Portions: {mealDetails.servings}</Text>
                    </View>

                    {/* Steps */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Steps</Text>
                        <Text style={styles.paragraph}>{mealDetails.instructions}</Text>
                    </View>

                    {/* Toggle between "Add to Favorites" and "Remove from Favorites" */}
                    <Button mode="contained" onPress={toggleFavorite} style={styles.button}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </Button>

                    <Button mode="contained" onPress={toggleAddIngredientsVisibility} style={styles.button}>
                        Add Ingredients to Shopping List

                    </Button>

                    <Portal>
                        <Modal visible={isAddIngredientsVisible} transparent={true} onRequestClose={toggleAddIngredientsVisibility}>
                            <TouchableWithoutFeedback onPress={toggleAddIngredientsVisibility}>
                                <View style={styles.modalOverlay}  onClose={toggleAddIngredientsVisibility}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.addIngredientsContainer}>
                                            <FlatList
                                                data={ingredientsData}
                                                renderItem={({ item: ingredient }) => (
                                                    <View style={styles.input}>
                                                        <TextInput
                                                            style={styles.inputText}
                                                            placeholder={ingredient.amount.toString()}
                                                            keyboardType="numeric"
                                                            onChangeText={(amount) => setIngredientAmount(ingredient.id, Number(amount))}
                                                            value={ingredient.amount.toString()}
                                                        />
                                                        <Text> {ingredient.unit}</Text>
                                                        <Button mode="contained" onPress={() => {
                                                            addIngredient(ingredient.id, ingredient.amount);
                                                        }} style={styles.addButton}>
                                                            <Text style={styles.addButtonText}>Add</Text>
                                                        </Button>
                                                    </View>
                                                )}
                                                keyExtractor={(ingredient) => ingredient.id.toString()}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </Portal>

                </ScrollView>
            </Animated.View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAEBD7',
    },
    imageContainer: {
        alignItems: 'center',
        margin: 10,
    },
    mealImage: {
        width: '100%',
        height: 250,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    section: {
        marginHorizontal: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        margin: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center', // Align center vertically
        alignItems: 'center', // Align center horizontally
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    addIngredientsContainer: {
        backgroundColor: "#FAEBD7",
        borderRadius: 20,
        padding: 20,
        width: '80%',
        maxWidth: 400, // Set a maximum width for larger screens
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 5,
        marginBottom: 10, // Add bottom margin for spacing between ingredient items
        width: '100%',
    },
    inputText: {
        flex: 1,
        marginRight: 5, // Reduced margin
        borderWidth: 1,
        borderColor: '#007bff',
        padding: 5, // Reduced padding
        fontSize: 14, // Smaller font size
    },
    addButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 2,
        marginTop: 5, // Add top margin for spacing above the button
    },
    addButtonText: {
        color: '#fff',
        fontSize: 10, // Smaller font size for the button text
    },

});



export default MealView;