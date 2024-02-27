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
        const quantity = ingredient.quantity || 1; // Default to 1 if quantity is not specified

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
                updatedList[existingIndex].quantity += quantity;
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
            <Text>Search ingredient</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={handleSearch}
                value={searchQuery}
                placeholder="Search"
            />
            <Text>Shopping List</Text>
            {shoppingList && shoppingList.length > 0 ? (
                <FlatList
                    data={shoppingList}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                            <Text>{item.name} Qty: {item.quantity}</Text>
                            <Button
                                title="Remove"
                                onPress={() => removeFromShoppingList(item)} // Call removeFromShoppingList
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>List is empty</Text>
            )}


    <Text>Search Results</Text>
            {searchResults && searchResults.results && searchResults.results.length > 0 ? (
                <FlatList
                    data={searchResults.results}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}` }}
                                style={{ width: 50, height: 50, marginRight: 10 }}
                            />
                            <Text>{item.name}</Text>
                            <TextInput
                                style={{ height: 40, width: 60, borderColor: 'gray', borderWidth: 1, marginLeft: 10 }}
                                keyboardType="numeric"
                                placeholder="Qty"
                                onChangeText={(text) => {
                                    const quantity = parseInt(text, 10); // Convert input to number
                                    item.quantity = quantity; // Update quantity in item object
                                }}
                            />
                            <Button
                                title="Add"
                                onPress={() => addToShoppingList(item)}
                            />
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                    ) : (
                <Text>Search List is empty</Text>
            )}
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
        headerText: 5,
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
});

export default ShoppingListView;
