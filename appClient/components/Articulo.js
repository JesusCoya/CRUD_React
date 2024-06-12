import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';

// Iconos
import {Feather} from "@expo/vector-icons";

export default function Articulo({
  id,
  nombre,
  descripcion,
  precio,
  cantidad_disponible,
  categoria,
  proveedor,
  imagen,
  clearArticulo,
}) {
    // Editar
    const navigation = useNavigation(); // Obtenemos el objeto de navegación
    const [producto, setProducto] = React.useState({
      id,
      nombre,
      descripcion,
      precio,
      cantidad_disponible,
      categoria,
      proveedor,
      imagen,
    });
    const editarProducto = () => {
      navigation.navigate('ActualizarProducto', { producto });
    }
    // Eliminar 
    const [isDeleteActive, setIsDeleteActive] = React.useState(false);
    async function deleteArticulo(){
      const response = await fetch (`http://192.168.0.10:8080/productos/${id}`,{
        method: "DELETE",
      });
      clearArticulo(id);
      console.log(response.status);
    }
    return (
    <TouchableOpacity style={styles.container}
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      >
          <View style={styles.contentContainer}>
          <Image
            source={{ uri: imagen }}
            style={styles.imagen}
            onError={(e) => {
              console.log("Error al cargar la imagen:", e.nativeEvent.error);
              // Mostrar un ícono de reemplazo en caso de error
              return <Feather name="image" size={50} color="#666666" />;
            }}
          />

            <View style={styles.textContainer}>
              <Text style={styles.title}>{nombre}</Text>
              <Text style={styles.subtitle}>Precio: {precio}</Text>
              <Text style={styles.description}>{descripcion}</Text>
              <Text style={styles.subtitle}>Cantidad disponible: {cantidad_disponible}</Text>
              <Text style={styles.subtitle}>Categoría: {categoria}</Text>
              <Text style={styles.subtitle}>Proveedor: {proveedor}</Text>
            </View>
            {isDeleteActive && (
              <View style={styles.deleteConfirmation}>
                <Text style={styles.deleteText}>¿Eliminar?</Text>
                <View style={styles.deleteButtons}>
                <Pressable style={[styles.deleteButton, styles.deleteConfirm]} onPress={deleteArticulo}>
                  <Text style={styles.deleteButtonText}>Sí</Text>
                </Pressable>
                <Pressable style={[styles.deleteButton, styles.deleteCancel]} onPress={() => setIsDeleteActive(false)}>
                  <Text style={styles.deleteButtonText}>No</Text>
                </Pressable>
                <Pressable style={[styles.editButton]} onPress={editarProducto}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </Pressable>
                </View>
              </View>
            )}
          </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
container: {
  backgroundColor: "#ffffff", // Fondo blanco
  borderRadius: 10, // Bordes redondeados
  marginBottom: 20, // Margen inferior
  shadowColor: "#000000", // Color de la sombra (negro puro para un contraste claro)
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3, // Aumenta la opacidad para una sombra más definida
  shadowRadius: 4, // Radio de la sombra
  elevation: 6, // Elevación para Android
  borderWidth: 1, // Añade un borde sutil
  borderColor: "#e0e0e0", // Color del borde (gris claro para sutilidad)
},

  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333333",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 3,
    color: "#666666",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666666",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteConfirmation: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ffe5e5", // Fondo rojo suave
    borderRadius: 10,
    padding: 15,
    zIndex: 1,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "2px solid #333333", // Contorno negro suave
    transition: "all 0.3s ease-in-out",
  },
  deleteText: {
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  deleteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    transition: "background-color 0.3s ease",
  },
  deleteConfirm: {
    backgroundColor: "#ff4d4d",
    ":hover": {
      backgroundColor: "#e60000",
    },
  },
  deleteCancel: {
    backgroundColor: "#4caf50",
    ":hover": {
      backgroundColor: "#388e3c",
    },
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },  
  editButton: {
    backgroundColor: '#2196F3', // Color de fondo azul
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  editButtonText: {
    color: '#FFF', // Color del texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});