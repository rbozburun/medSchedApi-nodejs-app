import bcrypt from 'bcrypt';
import db from '../models';

let salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hash = await bcrypt.hashSync(password, salt);
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
                email: data.email,
                password: hashPassword,
                gender: data.gender === '1' ? true : false,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.image,
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId && userId === 'ALL') {
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

module.exports = { createNewUser, getAllUsers, updateUserData, deleteUser, login };
