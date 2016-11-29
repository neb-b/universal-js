import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy } from 'passport-facebook';
import Boom from 'boom';

import VenueModel from './models/venue.model';

const loginCallback = (accessToken, refreshToken, profile, done) => {
  const { displayName, id } = profile;

  return Promise.resolve(VenueModel.findOne({ fb_id: id }))
    .then(venue => {
      if(!venue){
        return VenueModel.createAndSave({ fb_id: id, name: displayName });
      }

      return venue;
    })
    .then(venue => done(null, venue))
    .catch(err => {
      console.log(err);
    })
};

passport.use(new Strategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: 'http://localhost:1337/api/venues/login/callback'
  }, loginCallback));

passport.serializeUser(function(venue, done) {
  console.log('serializeUser: ' + venue._id);
  done(null, venue._id);
});

passport.deserializeUser(function(id, done) {
  console.log('\n\nDeserializer', id);
  VenueModel.findById(id, function(err, venue){
    console.log(venue);
      if(!err) done(null, venue);
      else done(err, null);
    });
});

export default passport;
