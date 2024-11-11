import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Vibration, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

const CalculoCalorias = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [nivelAtividade, setNivelAtividade] = useState('sedentario');
  const [objetivo, setObjetivo] = useState('manter');
  const [calorias, setCalorias] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const calcularCalorias = () => {
    if (!peso || !altura || !idade) {
      Vibration.vibrate();
      setMensagem('Por favor, preencha todos os campos!');
      return;
    }

    const alturaEmMetros = parseFloat(altura) / 100;
    const pesoEmKg = parseFloat(peso);
    const idadeEmAnos = parseInt(idade);

    let tmb;
    if (sexo === 'masculino') {
      tmb = 88.362 + (13.397 * pesoEmKg) + (4.799 * alturaEmMetros * 100) - (5.677 * idadeEmAnos);
    } else {
      tmb = 447.593 + (9.247 * pesoEmKg) + (3.098 * alturaEmMetros * 100) - (4.330 * idadeEmAnos);
    }

    let fatorAtividade = 1.2;
    switch (nivelAtividade) {
      case 'levementeAtivo':
        fatorAtividade = 1.375;
        break;
      case 'moderadamenteAtivo':
        fatorAtividade = 1.55;
        break;
      case 'muitoAtivo':
        fatorAtividade = 1.725;
        break;
      case 'extremamenteAtivo':
        fatorAtividade = 1.9;
        break;
    }

    let caloriasDiarias = tmb * fatorAtividade;
    if (objetivo === 'emagrecer') {
      caloriasDiarias -= 500;
    } else if (objetivo === 'engordar') {
      caloriasDiarias += 500;
    }

    setCalorias(caloriasDiarias.toFixed(0));
    setMensagem(`Você deve consumir cerca de ${caloriasDiarias.toFixed(0)} calorias por dia.`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Cálculo de Calorias Diárias</Text>

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

        <Text style={styles.label}>Sexo:</Text>
        <View style={styles.radioButtons}>
          <TouchableOpacity onPress={() => setSexo('masculino')} style={sexo === 'masculino' ? styles.selectedOption : styles.option}>
            <Text style={styles.radioText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSexo('feminino')} style={sexo === 'feminino' ? styles.selectedOption : styles.option}>
            <Text style={styles.radioText}>Feminino</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nível de Atividade:</Text>
        <View style={styles.radioButtons}>
          {['sedentario', 'levementeAtivo', 'moderadamenteAtivo', 'muitoAtivo', 'extremamenteAtivo'].map((nivel) => (
            <TouchableOpacity key={nivel} onPress={() => setNivelAtividade(nivel)} style={nivelAtividade === nivel ? styles.selectedOption : styles.option}>
              <Text style={styles.radioText}>{nivel.replace(/([A-Z])/g, ' $1')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Objetivo:</Text>
        <View style={styles.radioButtons}>
          {['manter', 'emagrecer', 'engordar'].map((goal) => (
            <TouchableOpacity key={goal} onPress={() => setObjetivo(goal)} style={objetivo === goal ? styles.selectedOption : styles.option}>
              <Text style={styles.radioText}>{goal.charAt(0).toUpperCase() + goal.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}

        <TouchableOpacity onPress={calcularCalorias} style={styles.button}>
          <Text style={styles.buttonText}>Calcular Calorias</Text>
        </TouchableOpacity>

        {calorias && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Calorias Diárias: {calorias}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  option: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedOption: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#e0ffe0',
    borderRadius: 5,
  },
  radioText: {
    color: '#333',
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
  message: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalculoCalorias;
