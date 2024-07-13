import UserService from '../services/UserService';

const handleLogin = async (req, res) => {
    let userData = req.body;
    if (!userData.email || !userData.password) {
        res.status(500).json({
            errCode: 1,
            message: 'Missing email or password',
        });
    }
    let result = await UserService.login(userData);
    res.status(200).json({
        errCode: result.errCode,
        message: result.errMessage,
        data: result.user ? result.user : {},
    });
};

const getAllUsers = async (req, res) => {
    let id = req.query.id; //All / Id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter! Please check again!',
            data: [],
        });
    }
    let users = await UserService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data: users,
    });
};

const createUser = async (req, res) => {
    let response = await UserService.createNewUser(req.body);
    return res.status(200).json(response);
};

const updateUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let response = await UserService.updateUserData(userId, req.body);
        return res.status(200).json(response);
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter! Please check again!',
        });
    }
};

const deleteUser = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter! Please check again!',
        });
    }
};

const getAllCode = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required parameter. Please check again!',
            });
        }
        let data = await UserService.getAllCodeServices(type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Error getAllCode: ', error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    handleLogin,
    getAllCode,
};
