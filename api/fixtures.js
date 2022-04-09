const mongoose = require('mongoose');
const config = require("./config");
const Gallery = require("./models/Gallery");
const User = require("./models/User");
const {nanoid} = require("nanoid");


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [adam, john, jane] = await User.create({
        email: 'adam@gmail.com',
        password: '123',
        displayName: 'Adam',
        token: nanoid(),
    }, {
        email: 'john@gmail.com',
        password: '123',
        displayName: 'John',
        token: nanoid(),
    }, {
        email: 'jane@gmail.com',
        password: '123',
        displayName: 'Jane',
        token: nanoid(),
    });

    await Gallery.create({
        user: adam,
        title: 'Beautiful nature',
        image: '1.jpg',
    }, {
        user: adam,
        title: 'Beautiful nature',
        image: '2.jpg',
    }, {
        user: adam,
        title: 'Beautiful nature',
        image: '3.jpg',
    }, {
        user: john,
        title: 'Beautiful nature',
        image: '4.jpg',
    }, {
        user: john,
        title: 'Beautiful nature',
        image: '5.jpg',
    }, {
        user: jane,
        title: 'Beautiful nature',
        image: '6.jpg',
    }, {
        user: jane,
        title: 'Beautiful nature',
        image: '7.jpg',
    }, {
        user: jane,
        title: 'Beautiful nature',
        image: '8.jpg',
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));