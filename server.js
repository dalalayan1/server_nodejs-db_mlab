const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    dbUtils = require('./db'),
    PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

app.use('/data', (req, res) => {
    const reqParams = req.query;
    dbUtils.showData()
    // res.send('hello');
});