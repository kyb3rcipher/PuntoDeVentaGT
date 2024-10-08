import sqlite3 from 'sqlite3';
import fs from 'fs';

function abrir() {
    if (!fs.existsSync('./database.db')) {
        console.log('La base de datos no existe. Creando...');
        const db = new sqlite3.Database('./database.db', (err) => {
            if (err) {
                return console.error('Error al abrir la base de datos:', err.message);
            }
            console.log('Base de datos creada con éxito.');
        });
        crearTablas(db);
        insertarProductosEjemplo(db);

        return db;
    } else {
        return new sqlite3.Database('./database.db', (err) => {
            if (err) {
                return console.error('Error al abrir la base de datos:', err.message);
            }
            console.log('Abriendo base de datos SQLite.');
        });
    }
}

function crearTablas(db) {
    db.run(`CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigos TEXT NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        nombre VARCHAR(20) NOT NULL,
        precio_costo TEXT NOT NULL,
        precio_venta TEXT NOT NULL,
        ganancia TEXT NOT NULL,
        proveedor VARCHAR(20),
        FOREIGN KEY (proveedor) REFERENCES proveedores(nombre)
    )`, (err) => {
        if (err) {
            return console.error('Error al crear la tabla productos:', err.message);
        }
        console.log('Tabla productos creada con exito.');
    });

    db.run(`CREATE TABLE IF NOT EXISTS proveedores (
            nombre VARCHAR(20) NOT NULL
        )`, (err) => {
            if (err) {
                return console.error('Error al crear la tabla proveedores:', err.message);
            }
            console.log('Tabla proveedores creada con exito.');
    });
}

function insertarProveedores(db) {
    db.run(`INSERT INTO proveedores VALUES
        ('Coca Cola'),
        ('Big Cola'),
        ('Frijoleria?'),
        ('Maruchan?'),
        ('Tortilleria'),
        ('Sabritas')
    ;`, (err) => {
        if (err) {
            return console.error('Error al insertar proveedores:', err.message);
        }
        console.log('Inserción de proveedores hecha con éxito.');
    });
}

function insertarProductosEjemplo(db) {
    db.run(`INSERT INTO productos (codigos, tipo, nombre, precio_costo, precio_venta, ganancia, proveedor) VALUES
        ('["CODE", "CODE2"]', 'IDK', 'Coca Cola 500ml', '40.00', '20.00', '10', 'Coca Cola'),
        ('["CODE", "CODE2"]', 'IDK', 'Big Cola 500ml', '40.00', '10.00', '10', 'Big Cola'),
        ('["CODE", "CODE2"]', 'IDK', 'Frijoles', '40.00', '30.00', '10', 'Frijoleria?'),
        ('["CODE", "CODE2"]', 'IDK', 'Maruchan', '40.00', '15.50', '10', 'Maruchan?'),
        ('["CODE", "CODE2"]', 'IDK', 'Tortillas', '40.00', '90.50', '10', 'Tortilleria'),
        ('["CODE", "CODE2"]', 'IDK', 'Sabritas', '40.00', '20.00', '10', 'Sabritas')
    ;`, (err) => {
        if (err) {
            return console.error('Error al insertar productos ejemplo:', err.message);
        }
        console.log('Inserción de productos ejemplo hecha con éxito.');
    });
}
// insertarProductosEjemplo(abrir());
// insertarProveedores(abrir());

export default { abrir };