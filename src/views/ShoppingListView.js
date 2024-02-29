import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const ShoppingListView = ( {navigation}) => {
    const [shoppingList, setShoppingList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [quantityInput, setQuantityInput] = useState('');
    const [quantities, setQuantities] = useState({});
    const presenter = new HomePagePresenter(new RecipeModel());

    useEffect(() => {
        const loadShoppingList = async () => {
            const temp = await presenter.loadShoppingList(); // Method to implement in presenter
            setShoppingList(temp);
            console.log("shopping list---------------------------------------------------", temp);
        };

        loadShoppingList();
    }, []);

    const fetchIngredients = async (query) => {
        try {
            const data = await presenter.getIngredients(query);
            console.log('Testing', data);
            setSearchResults(data); // Update search results
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            // Handle error (e.g., display an error message to the user)
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== '') {
            await fetchIngredients(query);
        } else {
            setSearchResults([]); // Clear search results if query is empty
        }
    };

    const addToShoppingList = (ingredient) => {
        // Check if the ingredient already exists in the shopping list
        const existingIndex = shoppingList.findIndex(item => item.id === ingredient.id);

        // Get the quantity specified for the ingredient
        const quantity = ingredient.quantity || '1'; // Default to 1 if quantity is not specified

        // If the ingredient does not exist, add it to the shopping list with the specified quantity
        if (existingIndex === -1) {
            setShoppingList(prevList => {
                const updatedList = [...prevList, { ...ingredient, quantity }];
                presenter.saveShoppingList(updatedList); // Save updated shopping list
                return updatedList;
            });
        } else {
            // If the ingredient already exists, increase its quantity by the specified amount
            setShoppingList(prevList => {
                const updatedList = [...prevList];
                updatedList[existingIndex].quantity = (parseFloat(ingredient.quantity) + parseFloat(updatedList[existingIndex].quantity)).toString();
                presenter.saveShoppingList(updatedList); // Save updated shopping list
                return updatedList;
            });
        }
    };

    const removeFromShoppingList = (ingredient) => {
        setShoppingList(prevList => {
            const updatedList = prevList.filter(item => item.id !== ingredient.id);
            presenter.saveShoppingList(updatedList); // Save updated shopping list
            return updatedList;
        });
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    function updateIngredient(ingredient, quantity) {
        const newQuantity = quantity.replace(',','.');
        const existingIndex = shoppingList.findIndex(item => item.id === ingredient.id);
        setShoppingList(prevList => {
            const updatedList = [...prevList];
            updatedList[existingIndex].quantity = newQuantity;
            presenter.saveShoppingList(updatedList); // Save updated shopping list
            return updatedList;
        });
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
                        <Text>Favorites</Text>
                    </View>
                </TouchableOpacity>
                {/* Add more navigation links here */}
            </View>
        </React.Fragment>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {isDrawerOpen && renderSideMenu()}
            <Text style={styles.listTitles}>Search ingredient</Text>
            <TextInput
                style={styles.searchBar}
                onChangeText={handleSearch}
                value={searchQuery}
                placeholder="Search"
            />
            <Text style={styles.listTitles}>Shopping List</Text>
            {shoppingList && shoppingList.length > 0 ? (
                <FlatList
                    data={shoppingList}
                    renderItem={({ item }) => (
                        <View style={styles.shoppingListItemContainer}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={styles.ingredientImage}
                            />
                            <Text style={styles.shoppingListItemText}>{item.name}</Text>
                            <TextInput
                                style={styles.quantityBox}
                                keyboardType="numeric"
                                value={item.quantity.toString()}
                                placeholder={item.quantity.toString()}
                                onChangeText={(quantity) => updateIngredient(item, quantity)}
                            />
                            <TouchableOpacity
                                onPress={() => removeFromShoppingList(item)}
                                style={styles.removeButton}
                            >
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>List is empty</Text>
            )}


            {searchResults && searchResults.results && searchResults.results.length > 0 && (
                <Text style={styles.listTitles}>Search Results</Text>
            )}
            <FlatList
                data={searchResults.results}
                renderItem={({ item }) => (
                    <View style={styles.searchResultItemContainer}>
                        <View style={styles.ingredientImageAndNameContainer}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={styles.ingredientImage}
                            />
                            <Text
                                style={[
                                    styles.ingredientName,
                                    { fontSize: item.name.length > 23 ? 10 : 15 } // Adjust the condition and font sizes as needed
                                ]}
                                numberOfLines={1} // Limit the text to a single line
                            >
                                {item.name}
                            </Text>
                        </View>
                        <View style={styles.ingredientQuantityAndButtonContainer}>
                            <TextInput
                                style={styles.quantityBox}
                                keyboardType="numeric"
                                placeholder="Qty"
                                value={quantities[item.id] || ''}
                                onChangeText={(text) => {
                                    const newQuantities = { ...quantities, [item.id]: text.replace(',', '.') };
                                    setQuantities(newQuantities);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (quantities[item.id]) {
                                        const quantity = quantities[item.id];
                                        addToShoppingList({ ...item, quantity });
                                        const newQuantities = { ...quantities };
                                        delete newQuantities[item.id]; // Remove the quantity after adding to the shopping list
                                        setQuantities(newQuantities);
                                    }
                                }}
                                style={[styles.addButton, !quantities[item.id] && styles.disabledButton]}
                                disabled={!quantities[item.id]}
                            >
                                <Text style={styles.addButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1, // Full width by default
        backgroundColor: '#f2f2f2',
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
        marginLeft: '18%', // Pushes the headerText to the center
        marginRight: 'auto',
        marginBottom: 5,
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
    listTitles: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        marginLeft:5,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    shoppingListItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Add this line to push the button to the right
        borderBottomWidth: 5,
        borderColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 20,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1, // Add border width
        borderColor: '#000', // Add border color
    },
    shoppingListItemText: {
        flex: 1,
    },
    removeButton: {
        backgroundColor: 'purple',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'purple',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    removeButtonText:{
        color: '#FFFFFF',
    },
    addButtonText:{
        color: '#FFFFFF',
    },
    searchResultItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 5,
        borderColor: '#f2f2f2',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "white",
        borderRadius: 20,
    },
    ingredientImageAndNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientQuantityAndButtonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    ingredientName: {
        fontSize: 16,
        marginRight: 10,
    },
    quantityBox: {
        height: 45,
        width: 65,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 5,
        marginRight: 5,
        borderRadius: 8,

    },
});

export default ShoppingListView;
