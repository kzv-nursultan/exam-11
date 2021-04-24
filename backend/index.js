const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exitHook = require('async-exit-hook');
const config = require('./config');
const users = require('./app/users');
const goods = require('./app/goods');
const category = require('./app/categories');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.use('/goods', goods);
app.use('/users', users);
app.use('/categories', category);

const run = async () => {
    const connection = await mongoose.connect(config.db.url, config.db.options);

    app.listen(port, async ()=>{
        console.log('server started on port ' + port);
    });

    exitHook(async callback => {
        await mongoose.disconnect();
        console.log(' mongoose was disconnected');
        callback();
    });
};

run().catch(e=>console.error(e));