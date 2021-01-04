var express = require('express');
var CryptoJS = require('crypto-js');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var url = "mongodb://localhost:27017/DQJ";
const key = 'dqjqazplmwsxijne';
const iv = '3141592653589793';

router.get('/signIn', function(req, res, next) {

    var h_username = req.param('h_username');
    var h_password = req.param('h_password');

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DQJ");
        dbo.collection("user").find({"username":h_username}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length > 0) {
                if (decrypt(result[0].password) !== h_password) {
                    res.send({
                        status:0,
                        info:'wrong password.'
                    });
                    db.close();
                }
                else {
                    res.send({
                        status:1,
                    });
                    db.close();
                }
            }
            else {
                res.send({
                    status:0,
                    info:'user not exist.'
                });
                db.close();
            }
        });
    });
});

router.post('/signUp', function(req, res, next) {
    var obj = {
        username: req.body.h_username,
        email: req.body.h_email,
        password: req.body.h_password,
    };

    obj.password = encrypt(obj.password);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("DQJ");
        dbo.collection("user").find({"username":obj.username}).toArray(function(err, result) {
            if (err) throw err;
            if (result.length === 0) {
                return dbo.collection("user").insertOne(obj, function(err, result) {
                    if (err) throw err;
                    res.send({
                        status:1,
                    });
                    db.close();
                });
            }
            else {
                res.send({
                    status:0,
                    info:'user already exist.'
                });
                db.close();
            }
        });
    });
});

function encrypt(data) {
    return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}

function decrypt(data) {
    let decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
}

module.exports = router;