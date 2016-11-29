import Promise from 'bluebird';
import mongoose from 'mongoose';

export default function(mongoURL) {
  // Set bluebird promises as mongoose promise
  mongoose.Promise = Promise; //TODO sprada: Investigate if promisifying this is better.
  mongoose.connect(mongoURL);
}
