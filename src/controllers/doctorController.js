import DoctorService from '../services/DoctorService';

const getTopDoctor = async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) {
        limit = 10;
    }
    try {
        let doctors = await DoctorService.getTopDoctor(limit);
        return res.status(200).json(doctors);
    } catch (error) {
        console.log('Error getTopDoctor: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        let doctors = await DoctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (error) {
        console.log('Error getAllDoctors: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const postInfoDoctor = async (req, res) => {
    try {
        let data = req.body;
        if (data) {
            let response = await DoctorService.postInfoDoctor(data);
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log('Error postInfoDoctor: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getDoctorById = async (req, res) => {
    try {
        let doctorId = +req.query.id;
        if (!doctorId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameter',
            });
        }
        let doctorData = await DoctorService.getDoctorById(doctorId);
        return res.status(200).json(doctorData);
    } catch (error) {
        console.log('Error getDoctorById', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getProfileDoctorById = async (req, res) => {
    try {
        let doctorId = +req.query.id;
        if (!doctorId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameter',
            });
        }
        let doctorData = await DoctorService.getProfileDoctorById(doctorId);
        return res.status(200).json(doctorData);
    } catch (error) {
        console.log('Error getProfileDoctorById', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getExtraInfoDoctorById = async (req, res) => {
    try {
        let doctorId = +req.query.id;
        if (!doctorId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameter',
            });
        }
        let doctorData = await DoctorService.getExtraInfoDoctorById(doctorId);
        return res.status(200).json(doctorData);
    } catch (error) {
        console.log('Error getExtraInfoDoctorById', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const createScheduleTime = async (req, res) => {
    try {
        let data = req.body;
        if (data) {
            let response = await DoctorService.createScheduleTime(data);
            res.status(200).json(response);
        }
    } catch (error) {
        console.log('Error createScheduleTime: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getScheduleTime = async (req, res) => {
    try {
        let doctorId = req.query.doctorId;
        let date = req.query.date;
        if (!doctorId || !date) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameter',
            });
        } else {
            let data = await DoctorService.getScheduleTime(doctorId, date);
            return res.status(200).json(data);
        }
    } catch (err) {
        console.log('Error getScheduleTime: ', err);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

module.exports = {
    getTopDoctor,
    getAllDoctors,
    postInfoDoctor,
    getDoctorById,
    getDoctorById,
    getProfileDoctorById,
    createScheduleTime,
    getScheduleTime,
    getExtraInfoDoctorById,
};
