import Promise from 'bluebird';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: 'String', required: false },
  fbEventId: { type: 'String', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

EventSchema.statics.createAndSave = Promise.method(function(props) {
  let newEvent = new EventModel(props);

  newEvent.save((err, result) => {
    if(err) {
      throw new Error(err);
    }

    return result;
  });

  return newEvent;
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
