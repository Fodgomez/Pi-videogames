const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para VIDEOGAME
  // modelName / attributes / options
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    releaseDate: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    createdInDb: { //en caso de que querramos hacer un llamado solo a lo que esta en bd
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, 
  {timestamps: true,
      createdAt: 'creado',
      updatedAt: false
    }
  );
};
