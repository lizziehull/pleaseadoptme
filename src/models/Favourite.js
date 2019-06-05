module.exports = (sequelize) => {
  const Favourite = sequelize.define('Favourite', {}) 

  Favourite.associate = function (models) {
    Favourite.belongsTo(models.User)
    Favourite.belongsTo(models.Animal)
  }
  return Favourite
}
