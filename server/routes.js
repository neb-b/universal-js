import { Router } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import BoomHandler from './middlewares/boom.middleware';
import passport from './auth.init.js';

import ClubController from './controllers/club.controller';
import EventController from './controllers/events.controller';
import UserController from './controllers/users.controller';

import Club from './models/club.model';
import Event from './models/event.model';
import User from './models/user.model';

const instantiation = () => {
  return {
    Events: new EventController ({ User, Event, Club }),
    Clubs: new ClubController ({ Club }),
    Users: new UserController ({ User, Event, Club })
  };
};

const Routing = () => {
  const router = new Router();
  const Controllers = instantiation();

  // Login Routes
  router.get('/users/login',
    passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

  router.get('/users/login/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => res.cookie('loggedin', true).cookie('user', 'User').redirect('/'));

  // User Routes
  router.get('/users', ensureLoggedIn(), Controller.Users.getUser.bind(Controller.Users));
  router.patch('/users', ensureLoggedIn(), Controller.Users.getUser.bind(Controller.Users));
  router.get('/users/dashboard', ensureLoggedIn(), Controllers.Users.dashboard.bind(Controllers.Users));

  // Event Routes
  router.get('/events/fb/:id', Controllers.Events.getFBEvent.bind(Controllers.Events));
  router.get('/events/:id', Controllers.Events.getEvent.bind(Controllers.Events));
  router.patch('/events/:id', Controllers.Events.updateEvent.bind(Controllers.Events));
  router.post('/events', Controllers.Events.createEvent.bind(Controllers.Events));
  router.post('/events/:id/purchase', Controllers.Events.purchaseTicket.bind(Controllers.Events));

  // Clubs Routes
  router.get('/clubs/pending', Controllers.Clubs.getClub.bind(Controllers.Clubs));
  router.patch('/clubs', Controllers.Clubs.updateClub.bind(Controllers.Clubs));
  router.post('/clubs', ensureLoggedIn(), Controllers.Clubs.createClub.bind(Controllers.Clubs));
  router.get('/clubs/:id', Controllers.Clubs.getClub.bind(Controllers.Clubs));

  router.use(BoomHandler);

  return router;
};

export default Routing;
