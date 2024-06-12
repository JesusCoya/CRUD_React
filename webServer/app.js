import express from "express";
import{
    deleteProductoById,
    getProductoById,
    getProductos,
    insertProducto,
    updateProducto,
} from "./database.js"
import cors from "cors";

const app = express();
app.use(express.json());
// red privada y comunicación
// const corsOptions = {
//     origin: "http://127.0.0.1:5173",
//     methods: ["POST", "GET"],
//     credentials: true,
// };


const corsOptions = {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"], // C R U D
    credentials: true,
};
app.use(cors(corsOptions));


app.get("/productos/:id", async (req, res) => {
    const productos = await getProductoById(req.params.id);
    res.status(200).send(productos);
})

app.get("/productos", async (req, res) => {
    const productos = await getProductos();
    res.status(200).send(productos);
});

app.delete("/productos/:id", async (req, res) => {
    try {
        await deleteProductoById(req.params.id);
        res.status(200).send("Producto eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error al eliminar el producto");
    }
});
  
app.post("/productos", async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen } = req.body;

        // Validación de los datos del producto
        if (!nombre || !descripcion || !precio || !cantidad_disponible || !categoria || !proveedor || !imagen) {
            return res.status(400).send("Todos los campos son obligatorios");
        }

        // Inserta el producto en la base de datos
        await insertProducto(nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen);

        // Envía una respuesta exitosa al cliente
        res.status(201).send("Producto creado correctamente");
    } catch (error) {
        console.error("Error al insertar el producto:", error);
        res.status(500).send("Error al insertar el producto");
    }
});

app.put("/productos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen } = req.body;

        // Aquí se llama a la función updateProducto con los parámetros adecuados
        await updateProducto(id, nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen);
        
        // Si la función updateProducto se ejecuta correctamente, envía una respuesta exitosa
        res.status(200).send("Producto actualizado correctamente");
    } catch (error) {
        // Si hay un error, envía una respuesta de error al cliente
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error al actualizar el producto");
    }
});

app.listen(8080, ()=>{
    console.log("SERVER ACTIVO EN EL PUERTO 8080");
})

