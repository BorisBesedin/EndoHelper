const express = require('express');
// const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const app = express();

const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb+srv://Boris:145236@cluster0.b6swg.mongodb.net/atlas?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// })
//     .then((db) => console.log('[OK] DB is connected', db))
//     .catch(err => console.error(err));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(helmet());
app.use('/api/photos', require('./routes/photos'));
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/photos', express.static(path.join(__dirname, '../photos')));

app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}`);
})