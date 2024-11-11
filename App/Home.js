import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/Home.png')} style={styles.image} />

      <Text style={styles.title}>Bem-vindo ao seu aplicativo de treino!</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalculoIMC')}
      >
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalculoCalorias')}
      >
        <Text style={styles.buttonText}>Calcular Calorias</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Treino')}
      >
        <Text style={styles.buttonText}>Treino</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Academia')}
      >
        <Text style={styles.buttonText}>Academia</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
  },
  image: {
    width: 150,  // Ajuste o tamanho conforme necessário
    height: 150, // Ajuste o tamanho conforme necessário
    marginBottom: 30,  // Espaço entre a imagem e o título
  },
  button: {
    backgroundColor: '#4CAF50', // Cor de fundo do botão
    paddingVertical: 12, // Padding vertical
    paddingHorizontal: 30, // Padding horizontal
    borderRadius: 30, // Bordas arredondadas
    marginBottom: 15, 
    width: 250, // Largura fixa para os botões
    alignItems: 'center', // Centraliza o texto dentro do botão
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 18, // Tamanho da fonte
    fontWeight: 'bold', // Deixa o texto mais forte
  },
});

export default HomeScreen;
