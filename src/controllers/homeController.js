import db from '../models';

const getHomePage = async (req, res) => {
    let data = await db.User.findAll();
    console.log(data);
    res.render('homePage.ejs', { data: data });
};

module.exports = {
    getHomePage,
};
