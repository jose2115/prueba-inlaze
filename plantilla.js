'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class plantilla extends Model { // Cambiar el nombre de la clase por el nombre de la tabla
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {

      /** define association here
       * Example N:1 (un user tiene muchas plantillas)
       *
       * En ESTE modelo definimos que this.belongsTo, es decir: 1 Plantilla pertenece a 1 users

      this.belongsTo(models.users, {
        allowNull: false, // Se define si esta relación es obligatoria o no (debe coincider en ambos modelos y en la migración)
        foreignKey: 'idUser' // Nombre de la columna que almacena la FK
      })

      en el OTRO modelo (users para este ejemplo) decimos que "tiene" muchas plantillas

      this.hasMany(models.plantilla, {
        allowNull: false, // Se define si esta relación es obligatoria o no (debe coincider en ambos modelos y en la migración)
        foreignKey: 'idUser' // El nombre de la columna que guarda la FK
      })

       */

    }
  };
  plantilla.init({ // Cambiar "plantilla" por el nombre de la tabla
  /** ver https://sequelize.org/master/variable/index.html#static-variable-DataTypes en el menu lateral izquierdo al final hay documentación
   * sobre los DataTypes
   */
    id: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER, // Se define la columna que guarda la FK
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plantilla', // Cambiar el nombre del modelo por el nombre de la tabla
    freezeTableName: true
  })
  return plantilla
}
