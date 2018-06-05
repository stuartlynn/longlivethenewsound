require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const app = express();
const port = process.env.PORT || 5000;
const aws = require('aws-sdk')
const mongoose = require('mongoose');
const authentication = require('express-authentication');
var privateRouter = express.Router();


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
  state: {type: String, default: 'pending'}
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
    state : 'pending',
  },function(err,submission){
    if(err){
      res.write(400)
      res.json(err)
    }
    else{ res.json(submission)}
  })
})

const users = {}
users[process.env.ADMIN_USERNAME] = process.env.ADMIN_PASSWORD
console.log('authorised users ', users)
privateRouter.use(basicAuth({
  users:users,
  unauthorizedResponse:'Please login in to view this part of the site'
}))

privateRouter.get('/entry/',(req,res)=>{
  Submission.find({}, (err,submissions)=>{
    res.json(submissions)
  })
})

privateRouter.post('/entry/:id/approve', (req,res)=>{
  Submission.findById( req.params.id, (err,submission)=>{
    if (err){
      res.send(404)
    }
    else{
      submission.state = 'approved'
      submission.save((err,updatedSub)=>{
        if(err){res.send(500)}
        else{ res.json(updatedSub)}
      })
    }
  })
})

privateRouter.post('/entry/:id/reject', (req,res)=>{
  Submission.findById( req.params.id, (err,submission)=>{
    if (err){
      res.send(404)
    }
    else{
      submission.state = 'rejected'
      submission.save((err,updatedSub)=>{
        if(err){res.send(500)}
        else{ res.json(updatedSub)}
      })
    }
  })
})

privateRouter.get('/entry/aproved', (req,res)=>{
  Submission.find({'state' : 'aproved'}, (err,submissions)=>{
    res.json(submissions)
  })
})

privateRouter.get('/entry/pending', (req,res)=>{
  Submission.find({'state' : 'pending'}, (err,submissions)=>{
    res.json(submissions)
  })
})

privateRouter.get('/entry/rejected', (req,res)=>{
  Submission.find({'state' : 'rejected'}, (err,submissions)=>{
    res.json(submissions)
  })
})

privateRouter.post('/publish', (req,res)=>{

})

app.use('/private/', privateRouter)

app.use((eq, res)=>{
  res.sendfile('client/build/index.html')
});

app.listen(port, () => console.log(`Listening on port ${port}`));

