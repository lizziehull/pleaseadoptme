const {Animal} = require('../models')

module.exports = {
  async index (req, res) {
    const { Op } = require('sequelize')
    try {
      let animals = null
      const search = req.query.search
      if (search) {
        animals = await Animal.findAll({
          where: {
            [Op.or]: ['species', 'shelter', 'location', 'breed', 'name'].map(key => ({       
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }       
        })
      } else {
          animals = await Animal.findAll({
          where: {}
        })
      }
      res.send(animals)
    } catch (err) {
      res.status(500).send({
        error: 'Error when trying to get the animals.'
      })
      }  
    },
  // Post sends an animal created on the website to the database.
  async post (req, res) {
    try {
      const animal = await Animal.create(req.body)
      res.send(animal)
    } catch (err) {
      res.status(500).send({
        error: 'Error when trying to create the animal profile.'
      })
    }  
  },
  // Show displays an animal from the database.
  async show (req, res) {
    try {
      const animal = await Animal.findAll({
        where: {"id": req.params.animalId}
      })
      res.send(animal)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to show the animal.'
      })
    }
  },
  // Deletes animal from database.
  async delete (req, res) {
    try {
      const {animalId} = req.params
      console.log(animalId)
      const animal = await Animal.findByPk(animalId)
      await animal.destroy()
      res.send(animal)
    } catch (err) {
      console.log("Uh-oh")
      res.status(500).send({
        error: 'An error has occurred while trying to delete the favourite. Please try again.'
      })
    }
  }
}
