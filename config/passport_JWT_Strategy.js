const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; //to extract data from payload

const User = require('../model/user');

const opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'tobeset' //encryption key
}


passport.use(new JWTStrategy(opts, function(jwtPayload, done){ 
    User.findById(jwtPayload._id, function(err,user){
        if(err){console.log(err);return done(err,false);}
        if(user){
            return done(null,user);
        }
        return done(null,false);
    });
}));
//jwt header has 3 things 1-algo,2-payload,3-sign
module.exports = passport;