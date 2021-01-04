var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('SignIn')
})

router.get('/signUp', function (req, res, next) {
    res.render('signUp', {})
})

router.get('/homepage', function (req, res, next) {
    res.render('homepage', {})
})

router.get('/illustrations', function (req, res, next) {
    res.render('illustrations', {})
})

router.get('/videos', function (req, res, next) {
    res.render('videos', {})
})

router.get('/signIn', function (req, res, next) {
    res.render('SignIn', {})
})

module.exports  = router;