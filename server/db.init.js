import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function(mongoURL) {
  const Mongo = Promise.promisifyAll(mongoose)
  Mongo.connect(mongoURL);
}
