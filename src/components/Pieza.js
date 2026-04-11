import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const Pieza = ({ item, eliminarPieza, abrirDetalle }) => {
  return (
    <TouchableHighlight onPress={() => abrirDetalle(item)} underlayColor="transparent">
      <View style={styles.pieza}>
        <View>
          <Text style={styles.label}>Pieza:</Text>
          <Text style={styles.texto}>{item.pieza}</Text>
        </View>
        <View>
          <Text style={styles.label}>Fecha de Cambio:</Text>
          <Text style={styles.texto}>{item.fecha}</Text>
        </View>
        <TouchableHighlight 
          onPress={() => eliminarPieza(item.id)} 
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  pieza: { 
    backgroundColor: '#FFF', 
    borderBottomColor: '#e1e1e1', 
    borderStyle: 'solid', 
    borderBottomWidth: 1, 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    marginBottom: 10, 
    borderRadius: 10 
  },
  label: { fontWeight: 'bold', fontSize: 18, marginTop: 5 },
  texto: { fontSize: 18 },
  btnEliminar: { 
    padding: 10, 
    backgroundColor: 'red', 
    marginVertical: 10, 
    borderRadius: 5 
  },
  textoEliminar: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' },
});

export default Pieza;
