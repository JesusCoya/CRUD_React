CREATE DATABASE IF NOT EXISTS proyecto_final;

USE proyecto_final;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_disponible INT NOT NULL,
    categoria VARCHAR(50),
    proveedor VARCHAR(100),
    imagen LONGBLOB
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_disponible INT NOT NULL,
    categoria VARCHAR(50),
    proveedor VARCHAR(100),
    imagen VARCHAR(255) -- O ajusta la longitud según tus necesidades
);

INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) 
VALUES ('Clarinete', 'Clarinete de madera con llaves plateadas. Incluye boquilla y estuche.', 399.99, 5, 'Instrumentos musicales', 'Music Instruments Shop', '/proyecto_final/clarinete.jpg');

INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) 
VALUES ('Guitarra acústica', 'Guitarra acústica con tapa de abeto y fondo y costados de caoba. Ideal para principiantes.', 249.99, 8, 'Instrumentos musicales', 'Music Store Inc.', '/proyecto_final/guitarra.jpg');

INSERT INTO productos (nombre, descripcion, precio, cantidad_disponible, categoria, proveedor, imagen) 
VALUES ('Tambor', 'Tambor de percusión de 14 pulgadas con cuerpo de madera y parche de piel natural.', 149.99, 12, 'Instrumentos musicales', 'Percussion World', '/proyecto_final/tambor.jpg');