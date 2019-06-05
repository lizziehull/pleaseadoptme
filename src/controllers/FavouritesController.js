const {
  Favourite,
  Animal
} = require('../models')
const _ = require('lodash')

module.exports = {
  // Gets favourites (either all for a user or one user, one anima;).
  async index (req, res) {
    try {
      const userId = req.user.id
      const {animalId} = req.query
      const where = {
        UserId: userId
      }
      if (animalId) {
        where.AnimalId = animalId
      }
      const favourites = await Favourite.findAll({
        where: where,
        include: [
          {
            model: Animal
          }
        ]
      })
        .map(favourite => favourite.toJSON())
        .map(favourite => _.extend(
          {},
          favourite.Animal,
          favourite
        ))
      res.send(favourites)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to get the favourites. Please try again.'
      })
    }
  },
  // Posts a new favourite to the database.
  async post (req, res) {
    try {
      const userId = req.user.id
      const {animalId} = req.body
      const favourite = await Favourite.findOne({
        where: {
          AnimalId: animalId,
          UserId: userId
        }
      })
      if (favourite) {
        return res.status(400).send({
          error: 'Favourite already set.'
        })
      }
      const newFavourite = await Favourite.create({
        AnimalId: animalId,
        UserId: userId
      })
      res.send(newFavourite)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to set the favourite. Please try again.',
      })
    }
  },
  // Deletes favourite from database.
  async delete (req, res) {
    try {
      const userId = req.user.id
      const {favouriteId} = req.params
      const favourite = await Favourite.findOne({
        where: {
          id: favouriteId,
          UserId: userId
        }
      })
      if (!favourite) {
        return res.status(403).send({
          error: 'Unauthorised access to this favourite.'
        })
      }
      await favourite.destroy()
      res.send(favourite)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to delete the favourite. Please try again.'
      })
    }
  }
}
