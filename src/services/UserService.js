import bcrypt from 'bcrypt';
import db from '../models';
import EmailService from './EmailService';

let salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hash = await bcrypt.hashSync(password.trim(), salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
};

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: email,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let sendOtpCode = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExistEmail = await checkEmail(email);
            if (isExistEmail) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Please try another!',
                });
            } else {
                let data = await EmailService.sendOTPEmail(email);
                console.log(data);
                resolve({
                    errCode: 0,
                    message: 'Send opt code successfully!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used. Please try another!',
                });
            }
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email.trim(),
                password: hashPassword,
                gender: data.gender,
                firstName: data.firstName && data.firstName.trim(),
                lastName: data.lastName && data.lastName.trim(),
                address: data.address && data.address.trim(),
                phoneNumber: data.phoneNumber && data.phoneNumber.trim(),
                roleId: data.role && data.role,
                positionId: data.position && data.position,
                image: data.avatar && data.avatar,
            });
            resolve({
                errCode: 0,
                message: 'OK',
            });
        } catch (error) {
            reject(error);
        }
    });
};

let login = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { email, password } = data;
            let userData = {};

            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: {
                        email: email,
                    },
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                        resolve(userData);
                    } else {
                        (userData.errCode = 3), (userData.errMessage = `Wrong password!`);
                        resolve(userData);
                    }
                } else {
                    (userData.errCode = 2), (userData.errMessage = `User is not found!`);
                    resolve(userData);
                }
            } else {
                (userData.errCode = 1),
                    (userData.errMessage = `Your email is not found in the system. Please try again!`);
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUsers = (userId, page, per_page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {};
            const offset = (page - 1) * per_page;

            if (userId && page && per_page && userId === 'ALL') {
                users = await db.User.findAndCountAll({
                    offset,
                    limit: per_page,
                    attributes: {
                        exclude: ['password'],
                    },
                    order: [['id', 'DESC']],
                });
            }

            if (userId && !page && !per_page && userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId,
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                });
            }
            console.log(users);
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
            });
            if (user) {
                if (data.email) {
                    let check = await checkEmail(data.email);
                    if (check === true) {
                        resolve({
                            errCode: 2,
                            message: 'Your email is already in used. Please try another!',
                        });
                    }
                }
                await db.User.update(
                    {
                        ...data,
                    },
                    {
                        where: {
                            id: id,
                        },
                    },
                );
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User is not exist',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let status = await db.User.destroy({
                where: {
                    id: id,
                },
            });
            if (status) {
                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User is not exist!',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getAllCodeServices = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {};
            if (!type) {
                response.errCode = 1;
                response.message = 'Missing required parameter. Please check again!';
            }
            let allCode = await db.Allcode.findAll({ where: { type: type } });
            response.errCode = 0;
            response.data = allCode;
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    createNewUser,
    getAllUsers,
    updateUserData,
    deleteUser,
    login,
    getAllCodeServices,
    checkEmail,
    sendOtpCode,
};
