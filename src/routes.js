const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AnimalsController = require('./controllers/AnimalsController')
const AnimalsControllerPolicy = require('./policies/AnimalsControllerPolicy')
const FavouritesController = require('./controllers/FavouritesController')

const isAuthenticated = require('./policies/isAuthenticated')

/* Send request from the client side to the appropriate function in the controller.
Authenticate or validate input as necessary. */
module.exports = (app) => {
  app.post('/register', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
    
  app.post('/login', 
    AuthenticationControllerPolicy.register,
    AuthenticationController.login)
   
  app.get('/animals',
    AnimalsController.index)
  app.post('/animals',
    AnimalsControllerPolicy.post,
    AnimalsController.post)
  app.get('/animals/:animalId', 
    AnimalsController.show)
  app.delete('/animals/:animalId', 
    AnimalsController.delete) 
      
  app.get('/favourites',
    isAuthenticated,
    FavouritesController.index)
  app.post('/favourites',
    isAuthenticated,
    FavouritesController.post)
  app.delete('/favourites/:favouriteId',
    isAuthenticated,
    FavouritesController.delete)
}
