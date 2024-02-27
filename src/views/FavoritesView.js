import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';

const FavoritesView = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setFavorites });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = await presenter.getFavorites(); // Method to implement in presenter
            setFavorites(favs);
        };

        fetchFavorites();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleRecipePress = (item) => {
        //const mealDetails = presenter.getMealDetailsWithID(item.id );// Navigate to a new screen or perform any action with the selected recipe information
        navigation.navigate('MealDetails', { itemId: item.id});
        //console.log('Selected Recipe:', item);
        //navigation.navigate('MealDetails', { item});
    };

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeItem2}>
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
                <View>
                    <Image source={{ uri: item.image }} style={styles.image2} />
                    <Text style={styles.title2}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

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

    return (
        <View style={styles.container}>
            {renderHeader()}
            {isDrawerOpen && renderSideMenu()}
            <FlatList
                key={favorites.length}
                data={favorites}
                renderItem={renderRecipe}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            {/* Render favorite recipes */}
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
    recipeItem2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        width: '48%',
        marginRight: '2%',
    },
    image2: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    title2: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FavoritesView;
