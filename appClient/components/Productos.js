import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Button,TouchableOpacity } from 'react-native';
import Articulo from './Articulo';

export default function ListaProductos({ navigation }) {
  const [productos, setProductos] = useState([]);

  async function fetchData(){
    const response = await fetch("http://192.168.0.10:8080/productos");
    const data = await response.json();
    setProductos(data);
  }

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  function clearArticulo(id){
    setProductos(productos.filter((producto) => producto.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Instrumentos</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            // Navegar a la pantalla de registro de productos
            navigation.navigate('RegistroProducto');
          }}
          >
          <Text style={styles.buttonText}>Registrar Productos</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <FlatList
          data={productos}
          keyExtractor={(producto) => producto.id.toString()}
          renderItem={({ item }) => <Articulo {...item} clearArticulo={clearArticulo}/>}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    marginBottom: 30,
    paddingTop: 15,
    //justifyContent: 'center',
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#128C7E", // Verde oscuro y saturado
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
});
