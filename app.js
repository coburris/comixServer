require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');


let shelf = require('./controllers/shelfcontroller');
let user = require('./controllers/usercontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());

app.use(require('./middleware/headers'));
app.use(express.json());
app.use('/user', user);
app.use('/shelf', shelf);


// If your using express to listen on a port it will be app.listen. 
// If your using node http to listen on a port it will be http.listen.  
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})