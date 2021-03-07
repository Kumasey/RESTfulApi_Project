const express = require('express');
const apiRoutes = require('./routes/api_routes');

const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => res.send('Hello world with Express'));

app.listen(PORT, () => {
    console.log('Running restPractice on port: ' + PORT)
});

app.use('/api', apiRoutes);


mongoose.connect('mongodb://localhost:27017/restPractice', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

if(!db){
    console.log('Error connecting to DB')
}else{
    console.log('DB connected Successfully')
}