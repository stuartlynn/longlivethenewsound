const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const SubmissionSchema = new Schema({
  id: ObjectId,
  title : String,
  submitor : String,
  description : String,
  includeEmail: Boolean,
  acknowledgement: Boolean,
  name: String,
  email: String,
  submissionType: String,
  audioURL: String,
  artistLink: String,
  socialMedia: String,
  created_at    : { type: Date, required: true, default: Date.now },
  state: {type: String, default: 'pending'}
});

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission
