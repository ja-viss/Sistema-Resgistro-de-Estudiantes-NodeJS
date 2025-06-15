const conexion = require('../database/db');
const multer = require('multer');

exports.save = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const seccion = req.body.seccion;
  const an_es = req.body.an_es;

  // Obtener el archivo subido
  const rostro = req.file('rostro');

  // Validar que el archivo sea una imagen válida
  if (!rostro || !rostro.mimetype.startsWith('image/')) {
    return res.status(400).send('El archivo debe ser una imagen.');
  }

  // Guardar el archivo subido
  rostro.mv('./uploads/' + rostro.filename);

  // Guardar el archivo en la base de datos
  conexion.query(
    'INSERT INTO alumnos SET id=?, nombre=?, apellido=?, ano=?, seccion=?, rostro=?',
    [id, nombre, apellido, an_es, seccion, rostro.filename],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect('/');
      }
    }
  );
};

exports.update = (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const ano = req.body.ano;
    const seccion = req.body.seccion;
  
    conexion.query('UPDATE alumnos SET nombre = ?, apellido = ? , ano = ?, seccion = ? WHERE id = ?', [nombre, apellido, ano, seccion, id], (error, results) => {
      if (error) {
        console.error(error);
      } else {
        res.redirect('/');
      }
    });
  };