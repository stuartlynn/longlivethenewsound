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
  peiceName: String,
  peiceDesription: String,
  email: String,
  submissionType: String,
  audioURL: String,
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
  const peiceName  = req.body.peiceName
  const peiceDescription = req.body.peiceDescription
  const email = req.body.email
  const audioURL = req.body.audioURL
  const accepted = false
  console.log('entry ', req.body)


  const s  = Submission.create({
    peiceName: peiceName,
    peiceDescription: peiceDescrition,
    email: email,
    audioURL: audioURL,
    accepted: accepted
  },function(err,submission){
    if(err){
      res.write(400)
      res.json(err)
    }
    else{ res.json(submission)}
  })
})


app.listen(port, () => console.log(`Listening on port ${port}`));

