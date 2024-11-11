import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as Location from 'expo-location';

const Academia = () => {
  const [treinoAtivo, setTreinoAtivo] = useState(false);
  const [tempoTreino, setTempoTreino] = useState(0); // Cronômetro de treino
  const [tempoRestante, setTempoRestante] = useState(90); // Cronômetro de descanso (em segundos)
  const [tempoDescanso, setTempoDescanso] = useState(90); // Tempo de descanso personalizado
  const [localizacao, setLocalizacao] = useState(null); // Estado do usuário

  const [restando, setRestando] = useState(false); // Se está no descanso

  // Usando a geolocalização para pegar o estado
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync(location.coords);
        const estado = geocode[0]?.region; // Pegando o estado
        setLocalizacao(estado);
      }
    };

    getLocation();
  }, []);

  // Inicia o cronômetro de treino
  useEffect(() => {
    let timer;
    if (treinoAtivo) {
      timer = setInterval(() => {
        setTempoTreino((prevTempo) => prevTempo + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [treinoAtivo]);

  // Inicia o cronômetro de descanso
  useEffect(() => {
    let timer;
    if (restando && tempoRestante > 0) {
      timer = setInterval(() => {
        setTempoRestante((prevTempo) => prevTempo - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      setRestando(false);
      Vibration.vibrate(); // Vibra quando o tempo de descanso chega a 0
    }

    return () => clearInterval(timer);
  }, [restando, tempoRestante]);

  const startTreino = () => {
    setTreinoAtivo(true);
    setRestando(false);
  };

  const stopTreino = () => {
    setTreinoAtivo(false);
    setRestando(true);
    setTempoRestante(tempoDescanso); // Usando o tempo de descanso configurado
  };

  const resetTreino = () => {
    setTreinoAtivo(false);
    setTempoTreino(0);
    setTempoRestante(tempoDescanso);
    setRestando(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Cronômetro de Treino</Text>

        <Text style={styles.subtitle}>Tempo de Treino: {tempoTreino}s</Text>

        <TouchableOpacity onPress={startTreino} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopTreino} style={styles.button}>
          <Text style={styles.buttonText}>Parar Treino</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Tempo de Descanso:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={tempoDescanso.toString()}
          onChangeText={text => setTempoDescanso(Number(text))}
        />

        <TouchableOpacity onPress={resetTreino} style={styles.button}>
          <Text style={styles.buttonText}>Resetar Cronômetro</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopTreino} style={styles.button}>
          <Text style={styles.buttonText}>Descansar</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Tempo de Descanso: {tempoRestante}s</Text>

        <Text style={styles.sensorText}>Localização (Estado): {localizacao}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
  },
  sensorText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default Academia;
