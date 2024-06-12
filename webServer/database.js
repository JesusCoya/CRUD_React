import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

//Verificar
export async function getProductoById(id){
    const [row] = await pool.query(
        `SELECT * FROM productos WHERE id = ?`, [id]
    )
    //console.log(row[0]);
    return row[0]
}

export async function getProductos() {
    const [rows] = await pool.query(
        `SELECT * FROM productos`
    );
    // console.log(rows); // Puedes imprimir rows para ver la estructura de los datos si lo deseas
    return rows;
}

export async function deleteProductoById(id) {
    try {
        const result = await pool.query(
            `DELETE FROM productos WHERE id = ?`, [id]
        );
        return result;
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

export async function insertProducto(nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) {
    try {
        // Convierte la imagen a bytes        
        // Inserta el producto en la base de datos
        const result = await pool.query(
            `INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen]
        );
        
        return result;
    } catch (error) {
        console.error("Error al insertar el producto:", error);
        throw error;
    }
}

export async function updateProducto(id, nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) {
    try {
        // Realiza la actualización en la base de datos
        const result = await pool.query(
            `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad_disponible = ?, categoria = ?, proveedor = ?, imagen = ? WHERE id = ?`,
            [nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen, id]
        );
        
        return result;
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}
//getProductoById(2)