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
    TouchableWithoutFeedback, TouchableOpacity
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
            <Text>Meal Planner</Text>

            <Button title="Filter" onPress={toggleFilterVisibility} />

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

            <TextInput placeholder="Search for recipes..." />
            {/* Implement a list or grid for categories */}
            {/* Feature a recipe of the day or similar */}
            {/* Navigation buttons to other views */}
            <Button
                title="Go to Favorites"
                onPress={() => navigation.navigate('Favorites')}
            />
            <Button
                title="Go to Shopping List"
                onPress={() => navigation.navigate('ShoppingList')}
            />
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
    recipeItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#c1ecc1',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Adjust the width
        height: '60%', // Adjust the height
        alignSelf: 'center',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
});

export default HomePageView;
