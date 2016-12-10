import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: 'String', required: false },
  email: { type: 'String', required: false },
  fb_id: { type: 'String', required: false },
  token: { type: 'String', required: false },
  ak_id: { type: 'String', required: false },
  admin: { type: 'Boolean', default: false, required: true },
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  eventsInterested: [ { type: Schema.Types.ObjectId, ref:'Event'}]
});

UserSchema.statics.createAndSave = Promise.method(function(props) {
  let newUser = new UserModel(props);

  newUser.save((err, result) => {
    if(err) {
      throw new Error(err);
    }

    return result;
  });

  return newUser;
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
