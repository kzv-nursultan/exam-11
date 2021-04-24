const mongoose = require("mongoose");
const config = require('./config');
const {nanoid} = require("nanoid");
const Users = require("./models/UserSchema");
const Category = require("./models/CategoryScheme");
const Good = require("./models/GoodsSchema");

const run = async () => {
    await mongoose.connect(config.db.url, config.db.options);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3] = await Users.create({
        username: 'user001',
        password: 'user001',
        token: nanoid(),
        phone: '098098234',
        display_name: 'user001'

    },{
        username: 'user002',
        password: 'user002',
        token: nanoid(),
        phone:'8970124',
        display_name: 'user002'
    },{
        username: 'user003',
        password: 'user003',
        token: nanoid(),
        phone: '768232287',
        display_name: 'user003'
    });

    const [computers, cars, other] = await Category.create({
        name: 'Computers'
    },{
        name: 'Cars'
    }, {
        name: 'Other'
    });

    await Good.create({
        category: computers,
        title: 'keyboard',
        description: 'Keyboard for sale',
        image: '/fixtures/keyboard.jpg',
        author: user1,
        price: 100,
    }, {
        category: cars,
        title: 'Ferrari F40',
        description: 'mid-engine, rear-wheel drive sports car built in 1987',
        image: '/fixtures/f40.webp',
        author: user2,
        price: 1000000
    }, {
        category: other,
        title: 'washing machine',
        description: 'Lg washing machine for sale. Good condition',
        image: '/fixtures/lg.jpg',
        author: user3,
        price: 200
    })

    await mongoose.connection.close();
};

run().catch(e=>console.error(e));