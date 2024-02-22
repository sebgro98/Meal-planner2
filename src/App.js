import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

// Define your custom theme
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFF8DC', // Replace with your primary color
        accent: '#FFF8DC', // Replace with your accent color
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
