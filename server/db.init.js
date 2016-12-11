import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function(mongoURL) {
  Promise.promisifyAll(mongoose);

  mongoose.connect(mongoURL);
}
