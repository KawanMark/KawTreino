import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Vibration, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const savedPassword = await AsyncStorage.getItem(username);
    if (savedPassword && savedPassword === password) {
      navigation.navigate('Home');  // Navega para a tela Home após o login
    } else {
      Vibration.vibrate();  // Vibração ao errar a senha
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Login.png')} style={styles.image} />
      
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#999"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20,
  },
  input: { 
    width: 300, 
    height: 40, 
    borderColor: 'blue', 
    borderWidth: 1, 
    marginBottom: 15, 
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: { 
    backgroundColor: '#4CAF50', 
    padding: 10, 
    width: 300, 
    alignItems: 'center', 
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18,
  },
  registerText: { 
    color: '#007BFF', 
    textDecorationLine: 'underline' 
  },
  image: {
    width: 100,  
    height: 100, 
    marginBottom: 30,  
  }
});

export default LoginScreen;
