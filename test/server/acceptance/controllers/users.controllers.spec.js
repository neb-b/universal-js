import td from 'testdouble';
import _ from 'lodash';
import Boom from 'boom';
import FB from 'fbgraph';

import UserController from '../../../../server/controllers/users.controller';

describe('UserController', () => {
  let controller;

  before(() => controller = new UserController());
  afterEach(() => td.reset());

  context('getUser', () => {
    it('returns user back from serialized logged in user', () => {});

    it('handles errors', () => {});
  });

  context('updateUser', () => {
    it('returns updated user', () => {});

    it('handles errors', () => {});
  });

  context('dashBoard', () => {
    it('it returns all data from logged in user', () => {});

    it('handles errors', () => {});
  });
});