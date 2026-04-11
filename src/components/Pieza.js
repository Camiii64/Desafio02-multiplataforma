import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const Pieza = ({ item, eliminarPieza, abrirDetalle }) => {
  return (
    <TouchableHighlight onPress={() => abrirDetalle(item)} underlayColor="transparent">
      <View style={styles.pieza}>
        <View style={styles.header}>
            <Text style={styles.labelHeader}>Repuesto:</Text>
            {/* Adaptado al nombre de variable de tu compañera */}
            <Text style={styles.textoPrincipal}>{item.pieza}</Text>
        </View>

        <View style={styles.infoRow}>
            <View>
                <Text style={styles.labelInfo}>Marca:</Text>
                <Text style={styles.textoInfo}>{item.marca}</Text>
            </View>
            <View>
                <Text style={styles.labelInfo}>Fecha:</Text>
                <Text style={styles.textoInfo}>{item.fecha}</Text>
            </View>
        </View>

        <TouchableHighlight 
          onPress={() => eliminarPieza(item.id)} 
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}>Eliminar Registro &times;</Text>
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  pieza: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 3 },
  header: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 10, marginBottom: 10 },
  labelHeader: { fontWeight: 'bold', fontSize: 12, color: '#95a5a6', textTransform: 'uppercase' },
  textoPrincipal: { fontSize: 20, fontWeight: 'bold', color: '#003366' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  labelInfo: { fontWeight: 'bold', fontSize: 12, color: '#95a5a6' },
  textoInfo: { fontSize: 16, color: '#34495e' },
  btnEliminar: { padding: 10, backgroundColor: '#e74c3c', borderRadius: 8, marginTop: 5 },
  textoEliminar: { color: '#FFF', fontWeight: 'bold', textAlign: 'center' }
});

export default Pieza;
