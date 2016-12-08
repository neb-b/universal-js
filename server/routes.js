import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import BoomHandler from './middlewares/boom.middleware';
import passport from './auth.init.js';

import VenueController from './controllers/venues.controller';
import EventController from './controllers/events.controller';
import UserController from './controllers/users.controller';

import Venue from './models/venue.model';
import Event from './models/event.model';
import User from './models/user.model';

const instantiation = () => {
  return {
    Events: new EventController ({ User, Event, Venue }),
    Venues: new VenueController ({ Venue }),
    Users: new UserController ({ User, Event, Venue })
  };
};

const Routing = () => {
  const router = new Router();
  const Controllers = instantiation();

  // Event Routes
  router.get('/events/:id', Controllers.Events.getEvent.bind(Controllers.Events));
  router.get('/events', Controllers.Events.searchEvents.bind(Controllers.Events));

  // Needs the user to have a Venue
  router.post('/events', ensureLoggedIn(), Controllers.Events.createEvent.bind(Controllers.Events));

  // Facebook login
  router.get('/users/login', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

  router.get('/users/login/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => res.cookie('loggedin', true).cookie('user', 'User').redirect('/'));

  router.get('/users/protected', ensureLoggedIn(), Controllers.Users.protected.bind(Controllers.Users));

  // Adds venue under a User
  router.post('/users/venue', ensureLoggedIn(), Controllers.Users.addVenue.bind(Controllers.Users));
  // Gets venue under a User
  router.get('/users/venue', ensureLoggedIn(), Controllers.Users.getVenue.bind(Controllers.Users));
  // Gets user's venue populated
  router.get('/users/:id/venue', Controllers.Users.getVenue.bind(Controllers.Users));
  // Gets user's fbEvents, venue and pages
  router.get('/users/dashboard', ensureLoggedIn(), Controllers.Users.dashBoard.bind(Controllers.Users));
  // Venue Routes
  router.get('/venues/:id', Controllers.Venues.getVenue.bind(Controllers.Venues));
  router.get('/venues/:id/profile', Controllers.Venues.getProfile.bind(Controllers.Venues));
  router.get('/venues', Controllers.Venues.searchVenue.bind(Controllers.Venues));
  router.post('/venues', ensureLoggedIn(), Controllers.Venues.createVenue.bind(Controllers.Venues));
  router.patch('/venues/:id', Controllers.Venues.updateVenue.bind(Controllers.Venues));

  router.use(BoomHandler);

  return router;
};

export default Routing;
