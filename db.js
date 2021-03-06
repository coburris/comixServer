const Sequelize = require('sequelize');
// const sequelize = new Sequelize('comix-app', 'postgres','password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {ssl:{require: true, rejectUnauthorize: false}}
})

sequelize.authenticate().then(
    function() {
        console.log('Connected to comix-app postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;