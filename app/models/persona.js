module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('persona', {
      id_persona: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Persona;
  };
  