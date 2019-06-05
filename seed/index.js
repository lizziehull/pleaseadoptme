const {
    sequelize,
    User,
    Animal,
    Favourite
} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const animals = require('./animals.json')
const favourites = require('./favourites.json')

// Enables reseeding the database when force is true.
sequelize.sync({force: true})
   .then(async function () {
     await Promise.all(
       users.map(user => {
         User.create(user)
       })
     )

   await Promise.all(
    animals.map(animal => {
      Animal.create(animal)
    })
  )

  await Promise.all(
    favourites.map(favourite => {
      Favourite.create(favourite)
    })
  )

})
