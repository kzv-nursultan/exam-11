const mongoose = require("mongoose");
const config = require('./config');
const {nanoid} = require("nanoid");
const Users = require("./models/UserSchema");

const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3] = await Users.create({
        username: 'user001',
        password: 'user001',
        token: nanoid()
    },{
        username: 'user002',
        password: 'user002',
        token: nanoid()
    },{
        username: 'user003',
        password: 'user003',
        token: nanoid()
    });

    await mongoose.connection.close();
};

run().catch(e=>console.error(e));