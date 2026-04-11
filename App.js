import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, Modal, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pieza from './src/components/Pieza';
import Formulario from './src/components/Formulario';
import colors from './src/utils/colors';

const App = () => {
  const [piezas, setPiezas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [piezaSeleccionada, setPiezaSeleccionada] = useState({});

  useEffect(() => {
    const obtenerPiezasStorage = async () => {
      try {
        const piezasStorage = await AsyncStorage.getItem('piezas');
        if (piezasStorage) setPiezas(JSON.parse(piezasStorage));
      } catch (error) { console.log(error); }
    };
    obtenerPiezasStorage();
  }, []);

  const guardarPiezasStorage = async (piezasJSON) => {
    try { await AsyncStorage.setItem('piezas', piezasJSON); } 
    catch (error) { console.log(error); }
  };

  const eliminarPieza = id => {
    const piezasFiltradas = piezas.filter(p => p.id !== id);
    setPiezas(piezasFiltradas);
    guardarPiezasStorage(JSON.stringify(piezasFiltradas));
  };

  const abrirDetalle = (item) => {
    setPiezaSeleccionada(item);
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Registro de Repuestos</Text>
        
        <TouchableHighlight onPress={() => guardarMostrarForm(!mostrarForm)} style={styles.btnMostrarForm}>
          <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar' : 'Agregar Nueva Pieza'}</Text>
        </TouchableHighlight>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <Formulario piezas={piezas} setPiezas={setPiezas} guardarMostrarForm={guardarMostrarForm} guardarPiezasStorage={guardarPiezasStorage} />
          ) : (
            <>
              <Text style={styles.subtitulo}>{piezas.length > 0 ? 'Tus Piezas' : 'No hay piezas, agrega una'}</Text>
              <FlatList data={piezas} renderItem={({ item }) => <Pieza item={item} eliminarPieza={eliminarPieza} abrirDetalle={abrirDetalle} />} keyExtractor={p => p.id} />
            </>
          )}
        </View>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.overlay}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitulo}>Detalle de la Pieza</Text>
                <Text style={styles.modalLabel}>Marca: <Text style={styles.modalInfo}>{piezaSeleccionada.marca}</Text></Text>
                <Text style={styles.modalLabel}>No. Serie: <Text style={styles.modalInfo}>{piezaSeleccionada.serie}</Text></Text>
                <TouchableHighlight style={styles.btnCerrar} onPress={() => setModalVisible(false)}>
                    <Text style={styles.textoCerrar}>Cerrar</Text>
                </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: { backgroundColor: colors.PRIMARY_COLOR, flex: 1 },
  titulo: { color: '#FFF', marginTop: Platform.OS === 'ios' ? 60 : 40, fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { color: '#FFF', fontSize: 18, textAlign: 'center', marginVertical: 15 },
  contenido: { marginHorizontal: '2.5%', flex: 1 },
  btnMostrarForm: { padding: 10, backgroundColor: colors.BUTTON_COLOR, marginVertical: 10, marginHorizontal: 20, borderRadius: 8 },
  textoMostrarForm: { fontWeight: 'bold', textAlign: 'center', color: colors.PRIMARY_COLOR },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalView: { backgroundColor: "white", borderRadius: 20, padding: 35, width: '85%', elevation: 5 },
  modalTitulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: colors.PRIMARY_COLOR, textAlign: 'center' },
  modalLabel: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  modalInfo: { fontWeight: 'normal' },
  btnCerrar: { backgroundColor: colors.PRIMARY_COLOR, padding: 10, borderRadius: 5, marginTop: 20 },
  textoCerrar: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' }
});

export default App;
