module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    location: DataTypes.STRING,
    shelter: DataTypes.STRING,
    contact: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageURL: DataTypes.STRING
   }) 
   return Animal
}
