import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function RegistroProducto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad_disponible, setCantidadDisponible] = useState('');
  const [categoria, setCategoria] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la biblioteca de medios.');
        }
      }
    })();
  }, []);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function registrar() {
    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Precio:', precio);
    console.log('Cantidad Disponible:', cantidad_disponible);
    console.log('Categoría:', categoria);
    console.log('Proveedor:', proveedor);
    console.log('Imagen:', imagen);
  
    try {
      const response = await fetch('http://192.168.0.10:8080/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          cantidad_disponible,
          categoria,
          proveedor,
          imagen,
        }),
      });
  
      if (response.ok) {
        console.log('Producto registrado correctamente');
        Alert.alert('Éxito', 'Producto registrado correctamente');
      } else {
        // Manejo de errores HTTP
        console.error('Error al registrar el producto:', response.status);
        Alert.alert('Error', `Error al registrar el producto: ${response.status}`);
      }
    } catch (error) {
      // Manejo de errores de red y otros errores
      console.error('Error al registrar el producto:', error);
      Alert.alert('Error', 'Error al registrar el producto. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Nuevo Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad Disponible"
        value={cantidad_disponible}
        onChangeText={setCantidadDisponible}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={styles.input}
        placeholder="Proveedor"
        value={proveedor}
        onChangeText={setProveedor}
      />
      <View style={styles.container}>
        <Button title="Elegir Imagen" onPress={pickImage} />
        {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}
      </View>
      <Button title="Registrar Producto" onPress={registrar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imagen: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});
