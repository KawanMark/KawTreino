import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Vibration, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    const existingUser = await AsyncStorage.getItem(username);

    if (existingUser) {
      setErrorMessage('Usuário já existe');
      Vibration.vibrate();  // Faz o celular vibrar
    } else {
      // Salva o usuário e a senha
      await AsyncStorage.setItem(username, password);
      Alert.alert('Sucesso', 'Registro realizado com sucesso!');
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Registro.png')} style={styles.image} />

      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Já tem uma conta? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '80%', padding: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 20, borderRadius: 5 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16 },
  errorText: { color: 'red', fontSize: 14, marginBottom: 10 },
  image: {
    width: 150,  // Ajuste o tamanho conforme necessário
    height: 150, // Ajuste o tamanho conforme necessário
    marginBottom: 20,  // Espaço entre a imagem e o título
  },
});

export default RegistroScreen;
