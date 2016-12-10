import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';

import EventController from '../../../server/controllers/events.controller';

describe('UserController', () => {
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

  context.skip('createEvent', () => {
    it('returns created event', (done) => {
      let mockReq = { user: { id: 'test-user-id'}, body: { name: 'test-party', foo: 'bar' } };
      let mockRes = { send: td.function() };
      let mockUser = { club: 'test-club-id', name: 'sean' };
      let mockClub = { id: 'test-club-id', name: 'baum', events: [], saveAsync: td.function() };
      let mockEvent = { _id: 'test-event-id', name: 'test-party', foo: 'bar' };

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-user-id'))
        .thenResolve(mockUser);

      controller.Club = { findByIdAsync: td.function() };
      td.when(controller.Club.findByIdAsync('test-club-id'))
        .thenResolve(mockClub);

      controller.Event = { createAndSave: td.function() };
      td.when(controller.Event.createAndSave({ name: 'test-party', foo: 'bar' }))
        .thenReturn(mockEvent);

      td.when(mockClub.saveAsync())
        .thenResolve(mockClub);

      td.when(mockRes.send(mockEvent))
        .thenDo(() => { done() });

      controller.createEvent(mockReq, mockRes, _.noop);
    });

    it('rejects for a user with no club', () => {});

    it('handles other errors', () => {});
  });

  context('updateEvent', () => {

  });

  context('getFBEvent', () => {

  });

  context('purchaseTicket', () => {

  });
});