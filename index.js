const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

// verificacion de puertos a usar
const PORT = process.env.PORT || 4000;
// vaeiable parq usae el modulo express
const app = express();
// varible para interprretar json
app.use(bodyParser.json());

// MySql conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'userbd'
});

// Route
app.get('/', (req, res) => {
    res.send('Connextion On!');
});

// all user
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM tbl_user';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not result');
        }
    });
});

//search user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM tbl_user WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
            res.json(result);
        } else {
            res.send('Not result');
        }
    });
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO tbl_user SET ?';
    //objeto usuarios paraalmacenar los usuarios
    const userObj = {
        //id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        email: req.body.email,
        fechaNacimiento: req.body.fechaNacimiento,
        //fechaRegistro: req.body.fechaRegistro //se ignora el sistema lo obtendra del sistema
    };

    connection.query(sql, userObj, error => {
        if (error) throw error;
        res.send(' User Creado!');
    });
});

// actualizar
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, fechaNacimiento } = req.body;
    const sql = `UPDATE tbl_user SET nombre = '${nombre}', apellido='${apellido}',telefono='${telefono}', email='${email}', fechaNacimiento='${fechaNacimiento}'WHERE id =${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('User Actualizado!');
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tbl_user WHERE id= ${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send('Delete User');
    });
});

// Check connect
connection.connect(error => {
    if (error) throw error;
    console.log('Database user server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));