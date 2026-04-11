import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableHighlight,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";
import colors from "../utils/colors";

const Formulario = ({ piezas, setPiezas, guardarMostrarForm, guardarPiezasStorage }) => {

  // ── Estado de cada campo
  const [tipoPieza, guardarTipoPieza]     = useState("");
  const [marca, guardarMarca]             = useState("");
  const [noSerie, guardarNoSerie]         = useState("");
  const [precio, guardarPrecio]           = useState("");
  const [fecha, guardarFecha]             = useState("");

  // ── Visibilidad del DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    guardarFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  // ── Validación y guardado
  const crearNuevaPieza = () => {
    // Validar que todos los campos estén llenos
    if (
      tipoPieza.trim() === "" ||
      marca.trim()     === "" ||
      noSerie.trim()   === "" ||
      precio.trim()    === "" ||
      fecha.trim()     === ""
    ) {
      mostrarAlerta();
      return;
    }

    // Crear objeto de la nueva pieza
    const pieza = { tipoPieza, marca, noSerie, precio, fecha };
    pieza.id = shortid();

    // Agregar al state
    const piezasNuevo = [...piezas, pieza];
    setPiezas(piezasNuevo);

    // Persistir en AsyncStorage
    guardarPiezasStorage(JSON.stringify(piezasNuevo));

    // Ocultar el formulario
    guardarMostrarForm(false);

    // Resetear campos
    guardarTipoPieza("");
    guardarMarca("");
    guardarNoSerie("");
    guardarPrecio("");
    guardarFecha("");
  };

  // ── Alerta de validación
  const mostrarAlerta = () => {
    Alert.alert(
      "Error",
      "Todos los campos son obligatorios",
      [{ text: "OK" }]
    );
  };

  // ── UI 
  return (
    <>
      <ScrollView style={styles.formulario}>

        {/* Tipo de Pieza */}
        <View>
          <Text style={styles.label}>Tipo de Pieza:</Text>
          <TextInput
            style={styles.input}
            value={tipoPieza}
            onChangeText={(texto) => guardarTipoPieza(texto)}
            placeholder="Ej. Filtro de aceite, Bujía..."
          />
        </View>

        {/* Marca */}
        <View>
          <Text style={styles.label}>Marca:</Text>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={(texto) => guardarMarca(texto)}
            placeholder="Ej. Bosch, NGK..."
          />
        </View>

        {/* Número de Serie */}
        <View>
          <Text style={styles.label}>Número de Serie:</Text>
          <TextInput
            style={styles.input}
            value={noSerie}
            onChangeText={(texto) => guardarNoSerie(texto)}
            placeholder="Ej. S013523"
          />
        </View>

        {/* Precio */}
        <View>
          <Text style={styles.label}>Precio ($):</Text>
          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={(texto) => guardarPrecio(texto)}
            placeholder="Ej. 25.00"
            keyboardType="numeric"
          />
        </View>

        {/* Fecha de Cambio */}
        <View>
          <Text style={styles.label}>Fecha de Cambio:</Text>
          <TouchableHighlight
            onPress={showDatePicker}
            style={styles.btnFecha}
            underlayColor={colors.BUTTON_COLOR}
          >
            <Text style={styles.textoFecha}>Seleccionar Fecha</Text>
          </TouchableHighlight>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />

          {/* Muestra la fecha seleccionada */}
          {fecha !== "" && (
            <Text style={styles.fechaSeleccionada}>{fecha}</Text>
          )}
        </View>

        {/* Botón Guardar */}
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaPieza()}
            style={styles.btnSubmit}
            underlayColor={colors.BUTTON_COLOR}
          >
            <Text style={styles.textoSubmit}>Guardar Pieza</Text>
          </TouchableHighlight>
        </View>

        {/* Botón Cancelar */}
        <View>
          <TouchableHighlight
            onPress={() => guardarMostrarForm(false)}
            style={styles.btnCancelar}
            underlayColor="#c0392b"
          >
            <Text style={styles.textoSubmit}>Cancelar</Text>
          </TouchableHighlight>
        </View>

      </ScrollView>
    </>
  );
};

// ── Estilos
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: colors.BACKGROUND,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    color: colors.PRIMARY_COLOR,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: colors.BORDER_COLOR,
    borderWidth: 1,
    borderStyle: "solid",
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#FFF",
    color: "#333",
  },
  btnFecha: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
    borderRadius: 6,
  },
  textoFecha: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  fechaSeleccionada: {
    fontSize: 16,
    marginTop: 5,
    color: colors.SECONDARY_COLOR,
    textAlign: "center",
    fontWeight: "bold",
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
    borderRadius: 6,
  },
  btnCancelar: {
    padding: 10,
    backgroundColor: colors.DANGER_COLOR,
    marginVertical: 5,
    marginBottom: 30,
    borderRadius: 6,
  },
  textoSubmit: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Formulario;