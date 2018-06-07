require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const app = express();
const port = process.env.PORT || 5000;
const aws = require('aws-sdk')
const mongoose = require('mongoose');
const authentication = require('express-authentication');
const mailer = require('express-mailer');
var privateRouter = express.Router();


app.use(bodyParser.json())
app.use(express.static('client/build'))
// Set up View engine (mostly for emails)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up database and schema
mongoose.connect(process.env.MONGO_CONNECTION);

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

// Set up s3 upload for react-dropzoe

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: 'longlivethenewsound',                           // required
    region: 'us-east-1',                            // optional
    headers: {'Access-Control-Allow-Origin': '*'},  // optional
    ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

// Set up mailer

mailer.extend(app, {
  from: process.env.NOTIFICATION_EMAIL_ADDRESS,
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.NOTIFICATION_EMAIL_ADDRESS,
    pass: process.env.NOTIFICATION_EMAIL_PASSWORD
  }
});

const sendArtistConfirmationEmail= (submission)=>{
  app.mailer.send('submission_email', {
    to: submission.email,
    subject: `Thanks for your submission of ${submission.title} to LLTNS`,
    submissionName: submission.title,
    name: submission.submitor
  },(err)=>{
    if (err){
      console.log(err)
    }
    else{
      console.log('sent artist notification email')
    }
  })
}

const sendReviewersConfirmationEmail= (submission)=>{
  const reviewers = process.env.REVIEWERS_EMAILS
  reviewers.split(',').forEach((reviewerEmail)=>{
    app.mailer.send('new_submission_to_review_email', {
      to: reviewerEmail,
      subject: `New LLTNS submission: ${submission.title}`,
      submissionName: submission.title,
      submitorName: submission.submitor,
      title: submission.title,
      state: submission.state,
      description: submission.description,
      submissionType: submission.submissionType,
      artistLink: submission.artistLink,
      socialMedia: submission.socialMedia,
      acknowledgement: submission.acknowledgement

    },(err)=>{
      if (err){
        console.log('could not send notification email to  ',reviewerEmail, err)
      }
      else{
        console.log('Review notification sent to ', reviewerEmail)
      }
    })
  })
}

app.get('/testemail/', (req,res)=>{
  console.log('SENDING EMAIL')
})

// Routes

// Submission route for submitting a new podcast
app.post('/entry/', (req,res)=>{
  const title  = req.body.title
  const name   = req.body.name
  const submitor = req.body.submitor
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
    submitor: submitor,
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
    else{
      res.json(submission)
      sendArtistConfirmationEmail(submission)
      sendReviewersConfirmationEmail(submission)
    }
  })
})

// Set up private API thats only accesable to authenticated users


const users = {}
users[process.env.ADMIN_USERNAME] = process.env.ADMIN_PASSWORD
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
  console.log("USING CATCHALL")
  res.sendfile('client/build/index.html')
});

app.listen(port, () => console.log(`Listening on port ${port}`));

