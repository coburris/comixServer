require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let shelf = require('./controllers/shelfcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());
<<<<<<< HEAD
=======

>>>>>>> c650b814b9841e5c2ad92361e842321871a806e9

app.use('/user', user);
app.use('/shelf', shelf);


app.listen(3000, function(){
    console.log('App is listening on port 3000');
})