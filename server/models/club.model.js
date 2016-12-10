import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: { type: 'String', required: false },
  pending: { type: 'Boolean', required: true, default: false },
  fbEvents: [{ type: 'String', required: false }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

ClubSchema.statics.createAndSave = Promise.method(function(props) {
  let newClub = new ClubModel(props);

  newClub.save((err, result) => {
    if(err) {
      throw new Error(err);
    }

    return result;
  });

  return newClub;
});

const ClubModel = mongoose.model('Club', ClubSchema);

export default ClubModel;
