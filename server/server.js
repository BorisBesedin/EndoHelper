const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
const fileupload = require('express-fileupload');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(fileupload({
    useTempFiles: true
}))
app.use('/api/photos', require('./routes/photos'));
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/photos', express.static(path.join(__dirname, '../photos')));

async function start() {
    try {
        const url = 'mongodb+srv://Boris:LVzozXQLqzfpPIMF@cluster0.b6swg.mongodb.net/atlas'
        await mongoose.connect(url, {
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
