const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config({
    path: 'variables.env',
});

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
    console.error(`${err.message}`);
});

//Init Middleware for auth
app.use(
    express.json({
        extended: false,
    })
);

//define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + 'client/build/index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}, click here to view http://localhost:${PORT}`));
