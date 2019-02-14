var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const router = express.Router();
const Register = require('../models/register');


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Register.find({ id: jwt_payload.id }, function (err, user) {
    if (user.length !== 0) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(strategy);
router.use(passport.initialize());


router.post("/login", function (req, res) {
    Register.find({ "admin": req.body.admin }, function (err, user) {

      if (user.length === 0) {
        res.status(401).json({ message: "no such user found" });
      }

      if (user.length !== 0) {
        if (user[0].password === req.body.password) {
          // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
          var payload = { id: user._id };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ message: "ok", token: token });
        } else {
          res.status(401).json({ message: "passwords did not match" });
        }
      }
    });
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json({ message: "Success! You can not see this without a token" });
});

router.get("/secretDebug",
  function (req, res, next) {
    console.log(req.get('Authorization'));
    next();
  }, function (req, res) {
    res.json("debugging");
  });

module.exports = router;