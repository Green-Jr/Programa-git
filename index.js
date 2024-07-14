const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(express.json())


// Routes
app.use('/api', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MONGODB conection
mongoose
    .connect(process.env.MONGODB_URI )
    .then(()=> console.log("Connected to MongoDB"))
    .catch((error)=> console.error("Error"))

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});