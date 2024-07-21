import { where } from 'sequelize';
import db from '../models';

let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {};
            let doctors = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            });

            response.errCode = 0;
            response.doctors = doctors;
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { getTopDoctor };
