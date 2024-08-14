import PatientService from '../services/PatientService';

const bookingAppointment = async (req, res) => {
    let booking = req.body;
    if (!booking) {
        res.status(500).json({
            errCode: 1,
            message: 'Missing ',
        });
    }
    let result = await PatientService.bookingAppointment(booking);
    res.status(200).json(result);
};

module.exports = {
    bookingAppointment,
};
