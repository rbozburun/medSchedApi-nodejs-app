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

const sendOtpCode = async (req, res) => {
    let email = req.body.email;
    if (!email) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter! Please check again!',
        });
    }
    let response = await UserService.sendOtpCode(email);
    return res.status(200).json(response);
};

const getAllUsers = async (req, res) => {
    let id = req.query.id; //All / Id
    let page = parseInt(req.query.page);
    let per_page = parseInt(req.query.per_page);

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parameter! Please check again!',
            data: [],
        });
    } else {
    }
    if (id && page && per_page) {
        let users = await UserService.getAllUsers(id, page, per_page);
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            total: users.count,
            per_page: per_page,
            page: page,
            total_pages: Math.ceil(users.count / per_page),
            data: users.rows,
        });
    } else if (id && !page && !per_page) {
        let users = await UserService.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data: users,
        });
    }
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
    sendOtpCode,
};
