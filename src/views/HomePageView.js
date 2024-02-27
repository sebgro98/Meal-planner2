import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    Button,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import FilterView from "./FilterView";

const HomePageView = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setRecipes });

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = React.useRef(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    useEffect(() => {
        presenter.fetchData(10);
    }, []);

    const applyFilters = (filters) => {
        presenter.applyFilters(filters);
    };

    const handleRecipePress = (item) => {
        navigation.navigate('MealDetails', { itemId: item.id });
        console.log('Selected Recipe:', item);
    };

    const getMoreRecepi = (num) => {
        presenter.fetchData(num);
    };

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeItem}>
            <TouchableOpacity onPress={() => handleRecipePress(item)}>
                <View>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
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
            <TouchableOpacity style={styles.filterButton} onPress={toggleFilterVisibility}>
                <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => (
        <View>
            <TouchableOpacity
                style={styles.viewMoreContainer}
                onPress={() => getMoreRecepi(recipes.results.length + 20)}
            >
                <Text style={styles.viewMoreText}>View More</Text>
                <Icon name="arrow-down" size={20} color="#000" />
            </TouchableOpacity>

            <Modal
                visible={isFilterVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleFilterVisibility}
            >
                <TouchableWithoutFeedback onPress={toggleFilterVisibility}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalView}>
                                <FilterView
                                    onApplyFilters={applyFilters}
                                    onClose={toggleFilterVisibility}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
                        navigation.navigate('Favorites');
                    }}
                >
                    <View style={styles.drawerItemContent}>
                        <Image source={require('../../assets/favorite.png')} style={styles.drawerItemImage}/>
                        <Text>Favorites</Text>
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
                style={{ flex: 1 }}
                ListFooterComponent={renderFooter}
                data={recipes.results}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    drawerItemContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    drawerItemImage: {
        marginRight: 10,
    },

    container: {
        flex: 1, // Full width by default
        backgroundColor: '#f2f2f2',
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        width: 250,
        height: '100%',
        backgroundColor: '#FAEBD7',
        padding: 20,
        zIndex: 2,
        transitionProperty: 'transform',
        transitionDuration: 300,
    },
    scrollContainer: {
        flex: 1,
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
    viewMoreContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#e0e0e0',
    },

    viewMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    drawerContainer: {
        flex: 1, // Take up all space below the header
        flexDirection: 'row', // Layout drawer and content side by side
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
    drawerOpen: {
        left: 0, // Show the drawer
        width: 200, // Smaller drawer width
    },
    drawerClosed: {
        left: -300, // Fully hide the smaller drawer
    },
    content: {
        flex: 1, // Content takes the rest of the space
        zIndex: 1, // Lower z-index, content is below drawer
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#8A2BE2',
        borderRadius: 5,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
        elevation: 3, // for Android shadow
        alignItems: 'center',
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    drawerItem: {
        paddingVertical: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8A2BE2', // This is a purple color
    },
    mainContent: {
        flex: 1,
        marginLeft: 0, // Default state with drawer closed
        zIndex: 1,
    },
    mainContentShrink: {
        marginLeft: 250, // Adjust this to the width of your drawer
        width: '80%', // You can adjust this percentage to control how much the main content should shrink
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    centerButtonContainer: {
        flex: 1, // This will allow the button to grow and center itself
        alignItems: 'center',
    },

    menuButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginRight: 5,
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
    },
    horizontalContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    buttonContainer: {
        marginRight: 5,
        minWidth: 20, // Increase the minimum width of the buttons
        height: 40, // Increase the height of the buttons
        justifyContent: 'center',
    },
    searchInput: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    recipeItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '48%',
        marginRight: '2%',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        width: '80%',
        height: '60%',
        alignSelf: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        margin: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        width: '80%',
        alignSelf: 'center',
    },
    closeMenu: {
        fontSize: 30,
    },

});

export default HomePageView;
