'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@gmail.com',
                password: 'admin',
                firstName: 'Tứn',
                lastName: 'Cà Chớn',
                address: 'HCM',
                gender: 'M',
                roleId: 'R1',
                phoneNumber: '0123456789',
                positionId: '',
                image: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
