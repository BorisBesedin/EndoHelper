const express = require('express');
// const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb+srv://Boris:145236@cluster0.b6swg.mongodb.net/atlas?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// })
//     .then((db) => console.log('[OK] DB is connected', db))
//     .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/photos', require('./routes/photos'));
app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/photos', express.static(path.join(__dirname, '../photos')));


app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}`);
})