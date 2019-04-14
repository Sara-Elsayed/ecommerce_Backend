const mongoose = require('mongoose');
const debug = require('debug')('ecommerce:server');

const connectionURL = process.env.MONGO_URL || 'mongodb+srv://sara:sara@cluster0-1e1sv.mongodb.net/ecommerce';

debug(`connecting to Mongo on ${connectionURL}`);

//mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});

mongoose.connect(connectionURL,
    {
        useCreateIndex: true,
        autoIndex: true,
        useNewUrlParser: true /*because of making this true, you must specify a port in your connection string, like mongodb://localhost:27017/dbname*/
    },
    (err)=>
    {
        if(err) {
            console.error(err);
            process.exit(1); //0 is a success code and 1 (or another number) can be a failure code.
        }else {
            debug (` connected successfuly to Mongo`)
        }
    }
)