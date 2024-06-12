import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaProductos from './components/Productos';
import RegistroProducto from './components/registroProductos';
import ActualizarProductos from './components/ActualizarProductos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaProductos" component={ListaProductos} options={{ title: 'Lista de Productos' }} />
        <Stack.Screen name="RegistroProducto" component={RegistroProducto} options={{ title: 'Registrar Producto' }} />
        <Stack.Screen name="ActualizarProducto" component={ActualizarProductos} options={{ title: 'Actualizar Producto' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
