const db = require('../config/db.config.js');
const Persona = db.persona;

// Crear y guardar una nueva Persona
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre || !req.body.apellido || !req.body.correo || !req.body.telefono) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
  }

  // Crear una Persona
  const persona = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    telefono: req.body.telefono
  };

  // Guardar Persona en la base de datos
  Persona.create(persona)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la Persona."
      });
    });
};

// Recuperar todas las Personas de la base de datos
exports.findAll = (req, res) => {
  Persona.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar las Personas."
      });
    });
};

// Encontrar una sola Persona con un id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Persona.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró la Persona con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar la Persona con id=" + id
      });
    });
};

// Actualizar una Persona por el id en la solicitud
exports.update = (req, res) => {
  const id = req.params.id;

  Persona.update(req.body, {
    where: { id_persona: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La Persona fue actualizada correctamente."
        });
      } else {
        res.send({
          message: `No se pudo actualizar la Persona con id=${id}. Puede que la Persona no exista o que los datos enviados estén vacíos.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la Persona con id=" + id
      });
    });
};

// Eliminar una Persona con el id especificado en la solicitud
exports.delete = (req, res) => {
  const id = req.params.id;

  Persona.destroy({
    where: { id_persona: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "La Persona fue eliminada correctamente."
        });
      } else {
        res.send({
          message: `No se pudo eliminar la Persona con id=${id}. Puede que la Persona no exista.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la Persona con id=" + id
      });
    });
};

// Eliminar todas las Personas de la base de datos
exports.deleteAll = (req, res) => {
  Persona.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Personas fueron eliminadas correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las Personas."
      });
    });
};
