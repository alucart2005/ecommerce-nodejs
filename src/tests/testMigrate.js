const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Test",
            lastName: "Use",
            email: "test@gmail.com",
            password: "test1234",
            phone: "1234567890"
        });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();