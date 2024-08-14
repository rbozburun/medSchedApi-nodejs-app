import bcrypt from 'bcrypt';
import db from '../models';

let bookingAppointment = (patientId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter',
                });
            }
            let patient = await db.User.findOne({ id: patientId, roleId: 'R3' });
            if (!patient) {
                resolve({
                    errCode: 2,
                    message: 'Patient not found',
                });
            } else {
                let isBooking = await db.Booking.find({
                    patientId: patientId,
                    date: data.date,
                    statusId: { $ne: 'S3' },
                }).toArray();

                if (isBooking.length > 0) {
                    resolve({
                        errCode: 3,
                        message: 'Appointment already exists',
                    });
                } else {
                    await db.Booking.create({
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        date: data.date,
                        timeType: data.timeType,
                        reason: data.reason,
                    });
                    resolve({
                        errCode: 0,
                        message: 'Booking successfully',
                    });
                }
            }

            resolve({
                errCode: 0,
                message: 'OK',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { bookingAppointment };
