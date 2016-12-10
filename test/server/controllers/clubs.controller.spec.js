import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';

import ClubController from '../../../server/controllers/clubs.controller';
import Club from '../../../server/models/club.model';

describe('ClubController', () => {
  let controller;

  before(() => controller = new ClubController());
  afterEach(() => td.reset());

  context('getClub', () => {
    it('returns club by id', (done) => {
      let mockResponse = { send: td.function() };
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };
      let mockRequest = { params: { id: 'test-id' } };
      let mockClub = { name: 'test-name' };

      controller.Club = { findById: td.function() };

      td.when(controller.Club.findById('test-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('events'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenResolve(mockClub);

      td.when(mockResponse.send(mockClub))
        .thenDo(() => { done() });

      controller.getClub(mockRequest, mockResponse, _.noop);
    });

    it('handles server error', (done) => {
      let mockNext = td.function();
      let mockPopulate = { populate: td.function() };
      let mockExec = { execAsync: td.function() };
      let mockRequest = { params: { id: 'test-id' } };
      let mockError = new Error('test-error');

      controller.Club = { findById: td.function() };

      td.when(controller.Club.findById('test-id'))
        .thenReturn(mockPopulate);

      td.when(mockPopulate.populate('events'))
        .thenReturn(mockExec);

      td.when(mockExec.execAsync())
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getClub(mockRequest, _.noop, mockNext);
    });
  });

  context('createClub', () => {
    it('returns created club', (done) => {
      let mockRequest = { user: { id: 'test-id' }, body: { name: 'test-name' } };
      let mockResponse = { send: td.function() };
      let mockUser = { id: 'test-id', name: 'sean', saveAsync: td.function() };
      let mockClub = { 'name': 'test-name' };

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenResolve(mockUser);

      controller.Club = { createAndSave: td.function() };
      td.when(controller.Club.createAndSave({ name: 'test-name' }))
        .thenResolve(mockClub);

      td.when(mockUser.saveAsync())
        .thenResolve(mockUser);

      td.when(mockResponse.send(mockUser))
        .thenDo(() => { done() });

      controller.createClub(mockRequest, mockResponse, _.noop);
    });

    it('handles server error', (done) => {
      let mockRequest = { user: { id: 'test-id' }, body: { name: 'test-name' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');

      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.createClub(mockRequest, _.noop, mockNext);
    });
  });

  context('updateClub', () => {
    it('returns the updated club', (done) => {
      let mockRequest = { user: { id: 'test-id' }, body: { name: 'test-name' } };
      let mockResponse = { send: td.function() };
      let mockUser = { club: 'test-club-id', foo: 'bar' };
      let mockClub = { name: 'test-name'};
      
      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenResolve(mockUser);

      controller.Club = { findByIdAndUpdateAsync: td.function() };
      td.when(controller.Club.findByIdAndUpdateAsync('test-club-id', { name: 'test-name' }, { new: true }))
        .thenResolve(mockClub);

      td.when(mockResponse.send(mockClub))
        .thenDo(() => { done() });

      controller.updateClub(mockRequest, mockResponse, _.noop);
    });

    it('handles server error', (done) => {
      let mockRequest = { user: { id: 'test-id' }, body: { name: 'test-name' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');
      
      controller.User = { findByIdAsync: td.function() };
      td.when(controller.User.findByIdAsync('test-id'))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.updateClub(mockRequest, _.noop, mockNext);
    });
  });

  context('getPendingClubs', () => {
    it('returns the list of pending clubs', (done) => {
      let mockRequest = { user: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      let mockClubs = [
        { name: 'test-name1'},
        { name: 'test-name2'},
        { name: 'test-name3'}
      ];
      
      controller.Club = { findAsync: td.function() };
      td.when(controller.Club.findAsync({ pending: true }))
        .thenResolve(mockClubs);

      td.when(mockResponse.send(mockClubs))
        .thenDo(() => { done() });

      controller.getPendingClubs(mockRequest, mockResponse, _.noop);
    });

    it('handles server error', () => {
      let mockRequest = { user: { id: 'test-id' } };
      let mockNext = td.function();
      let mockError = new Error('test-error');
      
      controller.Club = { findAsync: td.function() };
      td.when(controller.Club.findAsync({ pending: true }))
        .thenReject(mockError);

      td.when(mockNext(Boom.wrap(mockError)))
        .thenDo(() => { done() });

      controller.getPendingClubs(mockRequest, _.noop, mockNext);
    });
  });
});