require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
const aws = require('aws-sdk')
const mongoose = require('mongoose');
const authentication = require('express-authentication');


mongoose.connect(process.env.MONGO_CONNECTION);

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const SubmissionSchema = new Schema({
  id: ObjectId,
  title : String,
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
  accepted: Boolean
});

const Submission = mongoose.model('Submission', SubmissionSchema);

aws.config.loadFromPath('./aws_keys.json');
app.use(bodyParser.json())

//app.use(function() myauth(req, res, next) {
  //req.challenge = req.get('Authorization');
//})

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: 'longlivethenewsound',                           // required
    region: 'us-east-1',                            // optional
    headers: {'Access-Control-Allow-Origin': '*'},  // optional
    ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/entry/', (req,res)=>{
  const title  = req.body.title
  const name   = req.body.name
  const description = req.body.description
  const email = req.body.email
  const includeEmail= req.body.includeEmail
  const submissionType = req.body.submissionType
  const audioURL = req.body.audioURL
  const artistLink = req.body.artistLink
  const socialMedia = req.body.socialMedia
  const acknowledgement = req.body.acknowledgement
  const accepted = false

  console.log('entry ', req.body)


  const s  = Submission.create({
    title  : title,
    name   : name,
    description : description,
    email : email,
    emailInclude : email,
    submissionType : submissionType,
    includeEmail : includeEmail,
    audioURL : audioURL,
    artistLink : artistLink,
    socialMedia : socialMedia,
    acknowledgement : acknowledgement,
    accepted : false,
  },function(err,submission){
    if(err){
      res.write(400)
      res.json(err)
    }
    else{ res.json(submission)}
  })
})


app.listen(port, () => console.log(`Listening on port ${port}`));

