import React, { useEffect, useState } from 'react';
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
    ScrollView
} from 'react-native';
import HomePagePresenter from '../presenters/HomePagePresenter';
import RecipeModel from '../models/RecipeModel';
import FilterView from "./FilterView";

const HomePageView = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const presenter = new HomePagePresenter(new RecipeModel(), { updateData: setRecipes });

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    useEffect(() => {
        presenter.fetchData();
    }, []);


    const applyFilters = (filters) => {
        // Use the presenter to apply filters
        presenter.applyFilters(filters);
    };

    const handleRecipePress = (item) => {
        presenter.getMealDetails(item.id, navigation );// Navigate to a new screen or perform any action with the selected recipe information
        console.log('Selected Recipe:', item);
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Meal Planner</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalContainer}>
                <View style={styles.buttonContainer}>
                    <Button title="Filter" onPress={toggleFilterVisibility}
                            color="#8A2BE2"/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Go to Favorites"
                        onPress={() => navigation.navigate('Favorites')}
                        color="#8A2BE2"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Go to Shopping List"
                        onPress={() => navigation.navigate('ShoppingList')}
                        color="#8A2BE2"
                    />
                </View>
                {/* Add more buttons or views here as needed */}
            </ScrollView>

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

            {/* ... other navigation buttons */}
            {recipes.results && (
                <FlatList
                    key={recipes.results.length}
                    data={recipes.results}
                    renderItem={renderRecipe}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
});

export default HomePageView;
