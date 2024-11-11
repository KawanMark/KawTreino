import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TreinoScreen = () => {
  const [exercicio, setExercicio] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [series, setSeries] = useState('');
  const [treino, setTreino] = useState([]);

  // Carregar o treino salvo ao entrar na tela
  useEffect(() => {
    const loadTreino = async () => {
      try {
        const storedTreino = await AsyncStorage.getItem('treino');
        if (storedTreino) {
          setTreino(JSON.parse(storedTreino));
        }
      } catch (error) {
        console.error("Erro ao carregar treino:", error);
        Alert.alert("Erro", "Ocorreu um erro ao carregar o treino.");
      }
    };

    loadTreino();
  }, []);

  // Adicionar um exercício à lista
  const handleAddExercicio = () => {
    if (!exercicio || !repeticoes || !series) {
      Alert.alert("Por favor, preencha todos os campos!");
      return;
    }
    const novoExercicio = { exercicio, repeticoes, series };
    setTreino([...treino, novoExercicio]);
    setExercicio('');
    setRepeticoes('');
    setSeries('');
  };

  // Salvar o treino no AsyncStorage
  const handleSaveTreino = async () => {
    try {
      await AsyncStorage.setItem('treino', JSON.stringify(treino));
      Alert.alert('Treino salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao salvar o treino');
    }
  };

  // Remover o treino salvo
  const handleRemoveTreino = async () => {
    try {
      await AsyncStorage.removeItem('treino');
      setTreino([]); // Limpar o estado de treino localmente
      Alert.alert('Treino removido com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao remover o treino');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Treino.png')} style={styles.image} />

      <Text style={styles.title}>Personalize seu Treino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Exercício"
        placeholderTextColor="#999"
        value={exercicio}
        onChangeText={setExercicio}
      />
      <TextInput
        style={styles.input}
        placeholder="Repetições"
        placeholderTextColor="#999"
        value={repeticoes}
        keyboardType="numeric"
        onChangeText={setRepeticoes}
      />
      <TextInput
        style={styles.input}
        placeholder="Séries"
        placeholderTextColor="#999"
        value={series}
        keyboardType="numeric"
        onChangeText={setSeries}
      />
      <TouchableOpacity onPress={handleAddExercicio} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Exercício</Text>
      </TouchableOpacity>
      <FlatList
        data={treino}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text>{item.exercicio} - {item.repeticoes} reps - {item.series} séries</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleSaveTreino} style={styles.saveButton}>
        <Text style={styles.buttonText}>Salvar Treino</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemoveTreino} style={styles.removeButton}>
        <Text style={styles.buttonText}>Remover Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  exerciseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,  
    height: 150, 
    marginBottom: 20,  
  },
});

export default TreinoScreen;
