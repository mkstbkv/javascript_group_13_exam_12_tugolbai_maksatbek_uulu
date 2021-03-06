const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const galleries = require('./app/galleries');
const users = require('./app/users');
const config = require('./config');
const app = express();

const port = 8000;
const whitelist = ['http://localhost:4200', 'https://localhost:4200'];

const corsOptions = {
    origin: (origin, callback) => {
        if (origin === undefined || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', users);
app.use('/galleries', galleries);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));