import React, {useEffect, useState} from 'react';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Modal,
    FlatList,
    TextInput,
} from 'react-native';

const MealView = ({ route }) => {
    const [shoppingList, setShoppingList] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel());
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [isAddIngredientsVisible, setisAddIngredientsVisible] = useState(false);
    const [ingredientsData, setIngredientsData] = useState([]);
    const mealDetails = route.params.mealDetails; // Get meal ID passed from previous screen

    useEffect(() => {
        const data = mealDetails.extendedIngredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitShort,
        }));
        setIngredientsData(data);
    }, []);

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

    function toggleAddIngredientsVisibility() {
        setisAddIngredientsVisible(!isAddIngredientsVisible);
    }

    function setIngredientAmount(id, amount) {
        const data = ingredientsData.map((ingredient) => {
            if (ingredient.id === id) return { ...ingredient, amount: amount};
            return ingredient;
        });
        setIngredientsData(data);
    }

    function addIngredient(id, amount) {
        console.log("adding ingredient: ", id, "amount: ", amount);
    }

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
                <Text style={styles.detailsText}>{mealDetails.instructions}</Text>
            </View>

            <View style={styles.stepsContainer}>
                <Button
                    title="Add to Favorites"
                    onPress={addToFavorites}
                    color="white"
                />
            </View>

            <View style={styles.stepsContainer}>
                <Button
                    title="Add ingredients to shopping list"
                    onPress={toggleAddIngredientsVisibility}
                    color="white"
                />
            </View>

            <Modal
                visible={isAddIngredientsVisible}
                onRequestClose={toggleAddIngredientsVisibility}
                transparent={true}
            >

                <TouchableWithoutFeedback onPress={toggleAddIngredientsVisibility}>
                    <View style={styles.addIngredientsOverlay} onClose={toggleAddIngredientsVisibility}>
                        <TouchableWithoutFeedback>
                            <View style={styles.addIngredientsContainer}>
                                <FlatList
                                    data={ingredientsData}
                                    renderItem={({item: ingredient}) => (
                                        <View style={styles.addIngredientItem}>
                                            <Text style={styles.addIngredientsText} numberOfLines={1}> {ingredient.name}</Text>
                                            <TextInput
                                                style={styles.addIngredientBox}
                                                placeholder={ingredient.amount.toString()}
                                                keyboardType="numeric"
                                                onChangeText={(amount) => setIngredientAmount(ingredient.id, Number(amount))}
                                                value={ingredient.amount.toString()}
                                            />
                                            <Text style={styles.addIngredientsText}> {ingredient.unit}</Text>

                                            <Button
                                                title="Add"
                                                onPress={() => addIngredient(ingredient.id, ingredient.amount)}
                                            />
                                        </View>
                                    )}
                                    keyExtractor={(ingredient) => ingredient.id}
                                />
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>


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
        marginTop: 0,
    },
    ingredientsContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
    },
    nutritionContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
    },
    stepsContainer: {
        flex: 1,
        backgroundColor: '#3dd944',
        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
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

    addIngredientsOverlay: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    addIngredientsContainer: {
        marginTop: 120,
        margin: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Adjust the width
        height: 'auto', // Adjust the height
        alignSelf: 'center',
    },

    addIngredientsText: {
        fontSize: 18,
    },
    addIngredientItem: {
        flexDirection: "row",
        alignItems: "center",

    },
    addIngredientBox: {
        height: 25,
        width: 38,
        padding: 2,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 10,
    }


});

export default MealView;