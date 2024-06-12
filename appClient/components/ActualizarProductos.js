import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Platform, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';

export default function ActualizarProducto() {
  const route = useRoute(); // Obtener la ruta actual
  const producto = route.params.producto;

  // Estados para los campos editables
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [precio, setPrecio] = useState(producto.precio);
  const [cantidad_disponible, setCantidadDisponible] = useState(producto.cantidad_disponible);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [proveedor, setProveedor] = useState(producto.proveedor);
  const [imagen, setImagen] = useState(producto.imagen);
  
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la biblioteca de medios.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function actualizar() {
    try {
      const response = await fetch(`http://192.168.0.10:8080/productos/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: parseFloat(precio),
          cantidad_disponible: parseInt(cantidad_disponible),
          categoria,
          proveedor,
          imagen,
        }),
      });
  
      if (response.ok) {
        console.log('Producto actualizado correctamente');
        Alert.alert('Éxito', 'Producto actualizado correctamente');
      } else {
        // Manejo de errores HTTP
        console.error('Error al actualizar el producto:', response.status);
        Alert.alert('Error', `Error al actualizar el producto: ${response.status}`);
      }
    } catch (error) {
      // Manejo de errores de red y otros errores
      console.error('Error al actualizar el producto:', error);
      Alert.alert('Error', 'Error al actualizar el producto. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Actualizar Producto</Text>
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
        value={cantidad_disponible.toString()}
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
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>Elegir Imagen</Text>
      </TouchableOpacity>
      {imagen ? <Image source={{ uri: imagen }} style={styles.imagen} /> : null}
      <Button title="Actualizar Producto" onPress={actualizar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
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
  imagen: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center', // Alinea la imagen al centro
  },
  imagePickerButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
