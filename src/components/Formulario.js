import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, TouchableHighlight, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import nextId from 'react-id-generator';
import colors from '../utils/colors';

const Formulario = ({ piezas, setPiezas, guardarMostrarForm, guardarPiezasStorage }) => {
  const [pieza, guardarNombre] = useState('');
  const [marca, guardarMarca] = useState('');
  const [serie, guardarSerie] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const confirmarFecha = (date) => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    setDatePickerVisibility(false);
  };

  const crearNuevaPieza = () => {
    if (pieza.trim() === '' || marca.trim() === '' || serie.trim() === '' || fecha.trim() === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    const nuevaPieza = { id: nextId(), pieza, marca, serie, fecha };
    const piezasNuevo = [...piezas, nuevaPieza];
    setPiezas(piezasNuevo);
    guardarPiezasStorage(JSON.stringify(piezasNuevo));
    guardarMostrarForm(false);
  };

  return (
    <ScrollView style={styles.formulario}>
      <Text style={styles.label}>Pieza:</Text>
      <TextInput style={styles.input} onChangeText={guardarNombre} />
      
      <Text style={styles.label}>Marca:</Text>
      <TextInput style={styles.input} onChangeText={guardarMarca} />

      <Text style={styles.label}>No. Serie:</Text>
      <TextInput style={styles.input} onChangeText={guardarSerie} />

      <Text style={styles.label}>Fecha de Cambio:</Text>
      <Button title="Seleccionar Fecha" onPress={() => setDatePickerVisibility(true)} />
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={confirmarFecha} onCancel={() => setDatePickerVisibility(false)} />
      <Text>{fecha}</Text>

      <TouchableHighlight onPress={crearNuevaPieza} style={styles.btnSubmit}>
        <Text style={styles.textoSubmit}>Guardar Pieza</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: { 
    backgroundColor: '#FFF', 
    padding: 20, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20 
  },
  label: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginTop: 15,
    color: '#003366'
  },
  input: { 
    marginTop: 5, 
    height: 45, 
    borderColor: '#DDD', 
    borderWidth: 1, 
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9'
  },
  btnSubmit: { 
    padding: 15, 
    backgroundColor: '#FFCC00', 
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20
  },
  textoSubmit: { 
    color: '#003366',
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 18
  },
});
export default Formulario;