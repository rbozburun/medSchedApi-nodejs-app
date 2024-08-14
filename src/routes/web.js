import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.post('/api/login', userController.handleLogin);
    router.post('/api/get-otp-code', userController.sendOtpCode);

    router.get('/api/get-users', userController.getAllUsers);
    router.post('/api/create-user', userController.createUser);
    router.patch('/api/update-user', userController.updateUser);
    router.delete('/api/delete-user', userController.deleteUser);
    router.get('/api/get-all-code', userController.getAllCode);

    router.get('/api/get-top-doctor', doctorController.getTopDoctor);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.get('/api/get-doctor', doctorController.getDoctorById);
    router.get('/api/get-extra-info-doctor', doctorController.getExtraInfoDoctorById);
    router.get('/api/get-profile-doctor', doctorController.getProfileDoctorById);
    router.post('/api/post-info-doctor', doctorController.postInfoDoctor);
    router.post('/api/create-schedule-time', doctorController.createScheduleTime);
    router.get('/api/get-schedule-time', doctorController.getScheduleTime);

    return app.use('/', router);
};

module.exports = initWebRoutes;
