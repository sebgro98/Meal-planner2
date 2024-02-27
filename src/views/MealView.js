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
   TouchableOpacity,
} from 'react-native';
import {Portal, Button} from "react-native-paper";

const MealView = ({route, navigation}) => {
    const mealId = route.params?.itemId;
    const presenter = new HomePagePresenter(new RecipeModel());
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [isAddIngredientsVisible, setisAddIngredientsVisible] = useState(false);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [mealDetails, setMealDetails] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState([]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        setIsFavorite(presenter.isIDIncluded(mealDetails.id));
        const fetchData = async () => {
            try {
                const fetchedData = await presenter.getMealDetails(mealId);
                setMealDetails(fetchedData);
            } catch (error) {
                console.error("Error fetching meal details:", error);
            }
        };
        fetchData();
    }, [mealDetails.id]);

    useEffect(() => {
        const loadShoppingList = async () => {
            const temp = await presenter.loadShoppingList(); // Method to implement in presenter
            setShoppingList(temp);
        };

        loadShoppingList();
    }, []);


    useEffect(() => {
        if (!mealDetails.extendedIngredients) return;
        const uniqueIngredientIds = new Set(); // Set to store unique ingredient ids
        const data = mealDetails.extendedIngredients.reduce((accumulator, ingredient) => {
            // Check if the ingredient id is unique
            if (!uniqueIngredientIds.has(ingredient.id)) {
                uniqueIngredientIds.add(ingredient.id); // Add id to set to mark it as seen

                // Add unique ingredient to the data array
                accumulator.push({
                    id: ingredient.id,
                    image: ingredient.image,
                    name: ingredient.name,
                    quantity: ingredient.measures.metric.amount,
                    unit: ingredient.measures.metric.unitShort,

                });
            }

            return accumulator;
        }, []);
        setIngredientsData(data);
    }, [mealDetails]);

    const toggleFavorite = () => {
        setFavoriteMeals((prevFavorites) => {
            const isMealInFavorites = presenter.isIDIncluded(mealDetails.id);
            if (isMealInFavorites) {
                // Remove from favorites
                const updatedFavorites = prevFavorites.filter((mealId) => mealId !== mealDetails.id);
                // Remove from HomePagePresenter.selectedMealIds
                presenter.removeFavIDs(mealDetails.id);
                return updatedFavorites;
            } else {
                // Add to favorites
                const updatedFavorites = [...prevFavorites, mealDetails.id];
                presenter.addAFavIDs(mealDetails.id);
                return updatedFavorites;
            }
        });

        // Toggle the isFavorite state
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };

    function toggleAddIngredientsVisibility() {
        setisAddIngredientsVisible(!isAddIngredientsVisible);
    }

    function setIngredientQuantity(id, quantity) {
        const data = ingredientsData.map((ingredient) => {
            if (ingredient.id === id) return {...ingredient, quantity: quantity};
            return ingredient;
        });
        setIngredientsData(data);
    }

    function addIngredient(ingredient) {
        const existingIndex = shoppingList.findIndex(item => item.id === ingredient.id);

        // If the ingredient does not exist, add it to the shopping list with the specified quantity
        if (existingIndex === -1) {
            setShoppingList(prevList => {
                const updatedList = [...prevList, { ...ingredient }];
                presenter.saveShoppingList(updatedList); // Save updated shopping list
                return updatedList;
            });
        } else {
            // If the ingredient already exists, increase its quantity by the specified amount
            setShoppingList(prevList => {
                const updatedList = [...prevList];
                updatedList[existingIndex].quantity += ingredient.quantity;
                presenter.saveShoppingList(updatedList); // Save updated shopping list
                return updatedList;
            });
        }
        alert('Ingredient added to shopping list!');
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
                <View style={styles.hamburgerIcon}>
                    <View style={styles.hamburgerLine}></View>
                    <View style={styles.hamburgerLine}></View>
                    <View style={styles.hamburgerLine}></View>
                </View>
            </TouchableOpacity>
            <Text style={styles.headerText}>Meal Planner</Text>
        </View>
    );

    const renderSideMenu = () => (
        <React.Fragment>
            {isDrawerOpen && (
                <TouchableWithoutFeedback onPress={() => setIsDrawerOpen(false)}>
                    <View style={styles.backgroundDrawer}></View>
                </TouchableWithoutFeedback>
            )}
            <View style={[styles.drawer, isDrawerOpen ? styles.drawerOpen : styles.drawerClosed]}>
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => {
                        setIsDrawerOpen(false);
                    }}
                >
                    <View style={styles.drawerItemContent}>
                        <Text style={styles.closeMenu}>X</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => {
                        setIsDrawerOpen(false);
                        navigation.navigate('Home');
                    }}
                >
                    <View style={styles.drawerItemContent}>
                        <Image source={require('../../assets/home.png')} style={styles.drawerItemImage}/>
                        <Text style={styles.menuText}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => {
                        setIsDrawerOpen(false);
                        navigation.navigate('Favorites');
                    }}
                >
                    <View style={styles.drawerItemContent}>
                        <Image source={require('../../assets/favorite.png')} style={styles.drawerItemImage}/>
                        <Text style={styles.menuText}>Favorites</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => {
                        setIsDrawerOpen(false);
                        navigation.navigate('ShoppingList');
                    }}
                >
                    <View style={styles.drawerItemContent}>
                        <Image source={require('../../assets/shopping-list.png')} style={styles.drawerItemImage}/>
                        <Text>Shopping List</Text>
                    </View>
                </TouchableOpacity>
                {/* Add more navigation links here */}
            </View>
        </React.Fragment>
    );

    return ( mealDetails.extendedIngredients &&
                <View style={styles.container}>
                    {renderHeader()}
                    {isDrawerOpen && renderSideMenu()}
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: mealDetails.image}} style={styles.mealImage}/>
                            <Text style={styles.title}>{mealDetails.title}</Text>
                        </View>

                        {/* Ingredients */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Ingredients</Text>
                            {ingredientsData.map((ingredient, index) => (
                                <Text key={index} style={styles.paragraph}>
                                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                </Text>
                            ))}
                        </View>

                        {/* Nutritional Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Nutritional Information</Text>
                            <Text style={styles.paragraph}>Cook Time: {mealDetails.readyInMinutes} minutes</Text>
                            <Text style={styles.paragraph}>Health score: {mealDetails.healthScore}/100</Text>
                            <Text style={styles.paragraph}>Calories: {mealDetails.calories}</Text>
                            <Text style={styles.paragraph}>Carbs: {mealDetails.carbs}</Text>
                            <Text style={styles.paragraph}>Protein: {mealDetails.protein}</Text>
                            <Text style={styles.paragraph}>Fat: {mealDetails.fat}</Text>
                            <Text style={styles.paragraph}>Portions: {mealDetails.servings}</Text>
                            <Text style={styles.paragraph}>
                                Diets: {mealDetails.diets && mealDetails.diets.length > 0 ? (
                                mealDetails.diets.map((diet, index) => (
                                    <React.Fragment key={index}>
                                        {diet}
                                        {index !== mealDetails.diets.length - 1 && ', '}
                                    </React.Fragment>
                                ))) : (<>No specific diet</>)}
                            </Text>

                        </View>

                        {/* Steps */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Steps</Text>
                            {mealDetails.steps.map((step, index) => (
                                <Text key={index} style={styles.stepParagraph}>
                                    {step.number}. {step.step}
                                </Text>
                            ))}
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
                                                <Text style={styles.sectionTitle}>Add ingredients</Text>
                                                <FlatList
                                                    data={ingredientsData}
                                                    renderItem={({ item: ingredient }) => (
                                                        <View style={styles.ingredientContainer}>
                                                            <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                                            <View style={styles.ingredientContentContainer}>
                                                                <TextInput
                                                                    style={styles.inputText}
                                                                    placeholder={ingredient.quantity.toString()}
                                                                    keyboardType="numeric"
                                                                    onChangeText={(quantity) => setIngredientQuantity(ingredient.id, Number(quantity))}
                                                                    value={ingredient.quantity.toString()}
                                                                />
                                                                <Text style={styles.unitText}> {ingredient.unit}</Text>
                                                                <View style={{ alignItems: 'flex-end' }}>
                                                                    <Button mode="contained" onPress={() => {
                                                                        addIngredient(ingredient);
                                                                    }} style={styles.addButton}>
                                                                        <Text style={styles.addButtonText}>Add</Text>
                                                                    </Button>
                                                                </View>
                                                            </View>
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
                </View>
    );
}


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FAEBD7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    menuButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    hamburgerIcon: {
        width: 35,
        justifyContent: 'space-around',
        height: 25, // Height of the entire icon container
    },
    hamburgerLine: {
        height: 3, // Height of each line
        backgroundColor: 'black',
        width: '100%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        marginLeft: '18%', // Pushes the headerText to the center
        marginRight: 'auto'
    },
    backgroundDrawer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.5,
        zIndex: 1, // Ensure the overlay is behind the drawer
    },
    drawer: {
        position: 'absolute', // Absolute positioning to float over content
        top: 0,
        bottom: 0,
        width: 250, // Drawer width
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 50,
        zIndex: 2, // Higher z-index to float above content
    },
    drawerItemContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    drawerItem: {
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8A2BE2', // This is a purple color
    },
    drawerContainer: {
        flex: 1, // Take up all space below the header
        flexDirection: 'row', // Layout drawer and content side by side
    },
    drawerOpen: {
        left: 0, // Show the drawer
        width: 200, // Smaller drawer width
    },
    drawerClosed: {
        left: -300, // Fully hide the smaller drawer
    },
    drawerItemImage: {
        marginRight: 10,
    },
    closeMenu: {
        fontSize: 30,
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
        textAlign: "center",
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
    stepParagraph: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        margin: 10,
        backgroundColor: '#8A2BE2',
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
        height: '90%',
        maxWidth: 400, // Set a maximum width for larger screens
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ingredientContainer: {
        flexDirection: 'column', // Display items vertically
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 5,
        marginBottom: 10, // Add bottom margin for spacing between ingredient items
        width: '95%',
    },

    ingredientName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    ingredientContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        width: '90%',
    },

    inputText: {
        flex: 1,
        marginRight: 2,
        borderWidth: 1,
        borderColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    unitText: {
        marginLeft: 5,
        marginRight: 5,
    },
    addButton: {
        backgroundColor: '#8A2BE2',
        fontSize: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 10, // Smaller font size for the button text
    },

});



export default MealView;