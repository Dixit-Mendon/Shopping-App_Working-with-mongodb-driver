const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; //The underscore here is only to signal that this will only be internally used in this file

const mongoConnect = (callback) => {
    //In this we changed the database name from bydefault myFirstDatabase to shop
    MongoClient.connect("mongodb+srv://DNM14:Dixit@123@cluster0.xtbxa.mongodb.net/shop?retryWrites=true&w=majority", {
            useUnifiedTopology: true
        })
        .then(client => {
            console.log('Connected');
            _db = client.db(); //Here we are storing the connection to database. This will give access to shop database to which we automatically connect
            // _db = client.db('test'); //We could also do this to overwrite and connect to this test database instead of shop
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}
//We were trying to call mongoConnect from models/product.js 
//However if we do this, we will need to connect to mongodb for every operation we do and we would not disconnect thereafter. So this is not a good way of connecting to mongodb since we would want to connect and interact with it from different places in our app.
//So it will be better if we manage one connection in our database and then simply return access to the client which we setup once from or to the different in our app that need access. So will tune the setup a bit 

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb; //Here we are returning the connection to database