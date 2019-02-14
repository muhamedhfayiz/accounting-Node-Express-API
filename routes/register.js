const express = require('express');
const router = express.Router();

const Register = require('../models/register');
var nodemailer = require('nodemailer');
var OTP; var newRegister; var email;

// retriving data
router.get('/register', (req, res, next) => {
    Register.find(function (err, register) {
        res.json(register);
    })
});

//add data

router.post('/register', (req, res, next) => {

    email = req.body.email;
    Register.find({ "email": req.body.email }, function (err, email) {

        Register.find({ "companyName": req.body.companyName }, function (err, company) {

            if (email.length !== 0) {
                res.status(401).json({ message: "Email id alredy taken" });
            } else if (company.length !== 0) {
                res.status(401).json({ message: "Company alredy registered" });
            } else {

                newRegister = new Register({
                    companyName: req.body.companyName,
                    admin: req.body.admin,
                    email: req.body.email,
                    password: req.body.password

                });

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'app.surplus@gmail.com',
                        pass: 'Asmamk1$'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                OTP = Math.floor(Math.random() * 90000) + 10000;
                OTP = 'SP' + OTP;

                var mailOptions = {
                    from: 'app.surplus@gmail.com',
                    to: req.body.email,
                    subject: 'verification from surplus',
                    text: 'Thank you for join us!!! \n\n' + OTP + ' is your surplus verification code'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.json('failed to sent email');
                    } else {
                        res.json('verified');
                    }
                });
            }
        });
    });
});

router.post("/verifiedRegister", function (req, res) {
    if (OTP === req.body.otp && email === req.body.email) {
        newRegister.save((err, register) => {
            if (err) {
                res.json('failed to add');
            }
            else {
                res.json('register added succesfully');
            }
        });
    } else {
        res.json('OTP incorrect');
    }
});


//forgot password
router.post('/forgotPassword', (req, res, next) => {

    Register.find({ "companyName": req.body.companyName }, function (err, company) {
        if (company.length == 0) {
            res.json('no such company found');
        } else {
            res.json(company);
        }
    });
});

//reset password
router.post('/reset', (req, res, next) => {

        Register.find({ "admin": req.body.admin}, function (err, user) {

            if (user.length === 0) {
                res.json('no such user found');
            }

            if (user.length !== 0) {
                if (user[0].password === req.body.password) {
                    res.json({ message: "ok", id: user[0]._id});
                } else {
                    res.json('passwords did not match');
                }
            }
        });
});



//sending password to email
router.post('/passwordMail', (req, res, next) => {

    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'app.surplus@gmail.com',
            pass: 'Asmamk1$'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'app.surplus@gmail.com',
        to: req.body.email,
        subject: 'Password recovery from surplus',
        text: 'Your last used password is: ' + req.body.password + '\nReset your password for make secure your accounts data Or you can use same this password'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json('failed to sent email');
        } else {
            res.json('verified');
        }
    });

});

//update 

router.put('/register/:id', (req, res, next) => {

    Register.findById({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }

        result.password = req.body.password

        result.save((err, register) => {
            if (err) {
                res.json(err + { msg: 'failed to add' });
            }
            else {
                res.json({ msg: 'register updated succesfully' });
            }
        });
    });
});


//delete register

router.delete('/register/:id', (req, res, next) => {

    Register.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;