import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';
import Promise from 'bluebird';

import EventController from '../../../../server/controllers/events.controller';

describe('EventController', () => {
  let controller;

  before(() => controller = new EventController());
  afterEach(() => td.reset());

  context('getEvent', () => {
    it('returns event by id', (done) => {
      let mockReq = { params: { id: 'test-id' } };
      let mockRes = { send: td.function() };
      let mockEvent = { name: 'test-name' };

      controller.Event = { findByIdAsync: td.function() };
      td.when(controller.Event.findByIdAsync('test-id'))
        .thenResolve(mockEvent);

      td.when(mockRes.send(mockEvent))
        .thenDo(() => { done() });

      controller.getEvent(mockReq, mockRes, _.noop);
    });

    it('handles errors', (done) => {
      let mockReq = { params: { id: 'test-id' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');

      controller.Event = { findByIdAsync: td.function() };
      td.when(controller.Event.findByIdAsync('test-id'))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getEvent(mockReq, _.noop, mockNext);
    });
  });

  context('createEvent', () => {
    it('returns created event', (done) => {
      let mockReq = { user: { id: 'test-user-id'}, body: { name: 'test-party', foo: 'bar' } };
      let mockRes = { send: td.function() };
      let mockUser = { club: 'test-club-id', name: 'sean' };
      let mockClub = { id: 'test-club-id', name: 'baum', events: [], saveAsync: td.function() };
      let mockEvent = { _id: 'test-event-id', name: 'test-party', foo: 'bar' };

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenResolve(mockClub);

      controller.Event = { createAndSave: td.function() };
      td.when(controller.Event.createAndSave({ name: 'test-party', foo: 'bar' }))
        .thenReturn(Promise.resolve(mockEvent));

      td.when(mockClub.saveAsync())
        .thenReturn(Promise.resolve(mockClub));

      td.when(mockRes.send(mockEvent))
        .thenDo(() => { done() });

      controller.createEvent(mockReq, mockRes, _.noop);
    });

    it('rejects for a user with no club', (done) => {
      let mockReq = { user: { id: 'test-user-id'}, body: { name: 'test-party', foo: 'bar' } };
      let mockNext = td.function();
      let mockUser = { name: 'sean' };
      let mockError = Boom.preconditionFailed('You need to register a club to create events');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenResolve(null);

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      controller.createEvent(mockReq, _.noop, mockNext);
    });

    it('handles other errors', (done) => {
      let mockReq = { user: { id: 'test-user-id'}, body: { name: 'test-party', foo: 'bar' } };
      let mockNext = td.function();
      let mockUser = { name: 'sean' };
      let mockError = new Error('test-error');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.reject(mockError));

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.createEvent(mockReq, _.noop, mockNext);
    });
  });

  context('updateEvent', () => {
    it('returns edited event', (done) => {
      let mockReq = {
        user: { id: 'test-user-id' },
        params: { id: 'test-event-id' },
        body: { name: 'test-name'}
      };
      let mockRes = { send: td.function() };
      let mockUser = { _id: 'test-user-id', club: 'test-club-id' };
      let mockClub = { _id: 'test-club-id', events: ['test-event-id'], foo: 'bar' };
      let mockEvent = { _id: 'test-event-id', name: 'test-name' };

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenReturn(Promise.resolve(mockClub));

      controller.Event = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.Event.findByIdAndUpdateAsync('test-event-id', { name: 'test-name'}, { new: true }))
        .thenReturn(Promise.resolve(mockEvent));

      td.when(mockRes.send(mockEvent))
        .thenDo(() => { done() });

      controller.updateEvent(mockReq, mockRes, _.noop);
    });

    it('rejects if user has no club', (done) => {
      let mockReq = {
        user: { id: 'test-user-id' },
        params: { id: 'test-event-id' },
        body: { name: 'test-name'}
      };
      let mockNext = td.function();
      let mockUser = { _id: 'test-user-id' };
      let mockError = Boom.preconditionFailed('You need to register a club to edit events');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      controller.updateEvent(mockReq, _.noop, mockNext);
    });

    it('rejects if user has no event with that id', (done) => {
      let mockReq = {
        user: { id: 'test-user-id' },
        params: { id: 'test-event-id' },
        body: { name: 'test-name'}
      };
      let mockNext = td.function();
      let mockUser = { _id: 'test-user-id', club: 'test-club-id' };
      let mockClub = { _id: 'test-club-id', events:[] };
      let mockError = Boom.preconditionFailed('No event with that id in your club');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenReturn(Promise.resolve(mockClub));

      td.when(mockNext(mockError))
        .thenDo(() => { done() });

      controller.updateEvent(mockReq, _.noop, mockNext);
    });

    it('handles server errors', (done) => {
      let mockReq = {
        user: { id: 'test-user-id' },
        params: { id: 'test-event-id' },
        body: { name: 'test-name'}
      };
      let mockNext = td.function();
      let mockUser = { _id: 'test-user-id', club: 'test-club-id' };
      let mockClub = { _id: 'test-club-id', events:['test-event-id'] };
      let mockEvent = { _id: 'test-event-id' }
      let mockError = new Error('test-error');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenReturn(Promise.resolve(mockUser));

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenReturn(Promise.resolve(mockClub));

      controller.Event = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.Event.findByIdAndUpdateAsync('test-event-id', { name: 'test-name'}, { new: true }))
        .thenReturn(Promise.reject(mockError));

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.updateEvent(mockReq, _.noop, mockNext);
    });
  });

  context('getFBEvent', () => {

  });

  context('purchaseTicket', () => {

  });
});