import td from 'testdouble';
import _ from 'lodash';

import UserController from '../../../server/controllers/users.controller';

describe('UserController', () => {
  afterEach(() => td.reset());

  context.only('searchUser', () => {
    it('returns users back from query', () => {});
    it('returns empty array if nothing is found', () => {});

  });

  context('getUser', () => {
    it('returns user', (done) => {
      let controller = new UserController();
      let user = { "name": "test-name" };
      let mockRequest = { params: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      controller.User = { findById: td.function() };

      td.when(controller.User.findById(mockRequest.params.id)).thenReturn(user);
      td.when(mockResponse.send(user)).thenDo(() => done());

      controller.getUser(mockRequest, mockResponse, _.noop);
    });
  });

  context('getUsers', () => {
    it('returns a list of users', (done) => {
      let controller = new UserController();
      let users = [{ "name": "sergio" }, { "name": "sean" }];
      let mockResponse = { send: td.function() };
      controller.User = { find: td.function() };

      td.when(controller.User.find()).thenReturn(users);
      td.when(mockResponse.send(users)).thenDo(() => done());

      controller.getUsers(_.noop, mockResponse, _.noop);
    });
  });

  context('createUser', () => {
    it('returns created user', (done) => {
      let controller = new UserController();
      let user = { "name": "test-name" };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        body: {
          name: 'test-name',
          username: 'test-username',
          email: 'test-email'
        }
      };

      controller.User = { createAndSave: td.function() };

      td.when(controller.User.createAndSave(mockRequest.body)).thenResolve(user);
      td.when(mockResponse.send(user)).thenDo(() => done());

      controller.createUser(mockRequest, mockResponse, _.noop);
    });
  });

  context('updateUser', () => {
    it('returns updated user', (done) => {
      let controller = new UserController();
      let user = { "name": "test-name" };
      let mockResponse = { send: td.function() };
      let mockRequest = {
        params: { id: 'test-id' },
        body: { "name": "test-name" }
      };
      
      controller.User = { findByIdAndUpdate: td.function() };

      td.when(controller.User.findByIdAndUpdate(mockRequest.params.id, mockRequest.body, { new: true }))
        .thenReturn(user);
      td.when(mockResponse.send(user)).thenDo(() => done());

      controller.updateUser(mockRequest, mockResponse, _.noop);
    });
  });

  context('deleteUser', () => {
    it('returns deleted user', (done) => {
      let controller = new UserController();
      let user = { "name": "test-name" };
      let mockRequest = { params: { id: 'test-id' } };
      let mockResponse = { send: td.function() };
      controller.User = { findByIdAndRemove: td.function() };

      td.when(controller.User.findByIdAndRemove(mockRequest.params.id)).thenReturn(user);
      td.when(mockResponse.send(user)).thenDo(() => done());

      controller.deleteUser(mockRequest, mockResponse, _.noop);
    });
  });
});