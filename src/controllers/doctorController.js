import DoctorService from '../services/DoctorService';

const getTopDoctor = async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) {
        limit = 10;
    }
    try {
        let doctors = await DoctorService.getTopDoctor(limit);
        console.log('Doctors:', doctors);
        return res.status(200).json(doctors);
    } catch (error) {
        console.log('Error getTopDoctor: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

module.exports = {
    getTopDoctor,
};
