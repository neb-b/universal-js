import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function(mongoURL) {
  mongoose.Promise = Promise;
  Promise.promisifyAll(mongoose);

  mongoose.connect(mongoURL);
}
