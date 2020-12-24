const express = require('express');
const mongoose = require('mongoose');
const connectHistory = require('connect-history-api-fallback');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('../server/middleware/variables')
const path = require('path');
const cors = require('cors');
const fileupload = require('express-fileupload');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://Boris:LVzozXQLqzfpPIMF@cluster0.b6swg.mongodb.net/atlas';

const app = express();
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.use(cors());
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(varMiddleware);

app.use(express.urlencoded({extended: true}));
app.use(connectHistory())
app.use(fileupload({
    useTempFiles: true
}));

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


async function start() {
    try {        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}

start()
