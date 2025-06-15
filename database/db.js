const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'estudiantes_db'


});

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion es: '+error)
    }
    console.log('!Conectado a la base MySQL¡')
})

module.exports = conexion;