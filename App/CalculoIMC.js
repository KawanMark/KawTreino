import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Vibration, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';

const CalculoIMC = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [imc, setImc] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const calcularIMC = () => {
    if (!peso || !altura || !idade) {
      Vibration.vibrate();  // Vibra em caso de dados faltando
      setMensagem('Por favor, preencha todos os campos!');
      return;
    }

    const alturaEmMetros = parseFloat(altura) / 100; // Converte altura de cm para metros
    const resultadoIMC = parseFloat(peso) / (alturaEmMetros * alturaEmMetros);
    setImc(resultadoIMC.toFixed(2));

    let faixaIMC = '';
    if (resultadoIMC < 18.5) {
      faixaIMC = 'Abaixo do peso';
    } else if (resultadoIMC >= 18.5 && resultadoIMC < 24.9) {
      faixaIMC = 'Peso normal';
    } else if (resultadoIMC >= 25 && resultadoIMC < 29.9) {
      faixaIMC = 'Sobrepeso';
    } else {
      faixaIMC = 'Obesidade';
    }

    setMensagem(`Seu IMC é ${resultadoIMC.toFixed(2)} - ${faixaIMC}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Cálculo de IMC</Text>

        <Image 
          source={require('../assets/imc.png')}  
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (cm)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade (anos)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

        <TouchableOpacity onPress={calcularIMC} style={styles.button}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        {imc && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Seu IMC: {imc}</Text>
          </View>
        )}
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,  // Ajuste o tamanho conforme necessário
    height: 200, // Ajuste o tamanho conforme necessário
    marginBottom: 20,  // Espaço entre a imagem e o próximo campo
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalculoIMC;
  