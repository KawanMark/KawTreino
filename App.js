import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './App/LoginScreen';
import RegistroScreen from './App/Registro';
import HomeScreen from './App/Home';
import CalculoIMCScreen from './App/CalculoIMC';
import CalculoCaloriasScreen from './App/CalculoCalorias';
import TreinoScreen from './App/Treino';
import Academia from './App/Academia'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Registro"
          component={RegistroScreen}
          options={{ title: 'Registro' }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Página Inicial' }}
        />

        <Stack.Screen
          name="CalculoIMC"
          component={CalculoIMCScreen}
          options={{ title: 'Cálculo IMC' }}
        />
        <Stack.Screen
          name="CalculoCalorias"
          component={CalculoCaloriasScreen}
          options={{ title: 'Cálculo de Calorias' }}
        />
        <Stack.Screen
          name="Treino"
          component={TreinoScreen}
          options={{ title: 'Treino' }}
        />

        <Stack.Screen
          name="Academia"
          component={Academia}
          options={{ title: 'Academia' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
