import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.post('/api/login', userController.handleLogin);

    router.get('/api/get-users', userController.getAllUsers);
    router.post('/api/create-user', userController.createUser);
    router.patch('/api/update-user', userController.updateUser);
    router.delete('/api/delete-user', userController.deleteUser);

    return app.use('/', router);
};

module.exports = initWebRoutes;
