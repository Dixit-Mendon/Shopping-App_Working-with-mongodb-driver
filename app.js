const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database.js').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('604fad252e39ad845f466a6c')
        .then(user => {
            // req.user = user;    //Here the user that we are storing will be just an object with properites so the data we have in the database. All the methods of the usermodel wil not be in there because the user we are getting here is the data we are getting from the database and the methods aren't stored there. They couldn't be stored there. So to have a real user object with which we can interact, we should create a new User here.
            req.user = new User(user.name, user.email, user.cart, user._id);
            //this will help to call all the methods like addToCart on it.
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
});