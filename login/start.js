const start = require('./app');
const express = require('express');

var app = express();

app.use(function (req, res, next) {
    res.writeHead(200,{"Content_Type":"text/html"});//设置响应格式
    res.write("hello NodeJS");
    res.end();
});

start(app, 8020);