import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy } from 'passport-facebook';
import Boom from 'boom';

import UserModel from './models/user.model';

const loginCallback = (accessToken, refreshToken, profile, done) => {
  const { displayName, id } = profile;

  return Promise.resolve(UserModel.findOne({ fb_id: id }))
    .then(user => {
      if(!user){
        return UserModel.createAndSave({ fb_id: id, name: displayName });
      }

      return user;
    })
    .then(user => done(null, user))
    .catch(err => console.log(err));
};

passport.use(new Strategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: 'http://localhost:1337/api/users/login/callback'
  }, loginCallback));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user){
      if(!err) done(null, user);
      else done(err, null);
    });
});

export default passport;
