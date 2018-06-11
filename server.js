require('dotenv').config()
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const app = express();
const aws = require('aws-sdk')
const mongoose = require('mongoose');
const authentication = require('express-authentication');
const mailer = require('./src/mailer')
const updateFeed = require('./src/publish')

var privateRouter = express.Router();
const port = process.env.PORT || 5000;


app.use(bodyParser.json())
app.use(express.static('client/build'))
// Set up View engine (mostly for emails)
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set up database and schema
mongoose.connect(process.env.MONGO_CONNECTION);

// Set up s3 upload for react-dropzoe

app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
    bucket: 'longlivethenewsound',                           // required
    region: 'us-east-1',                            // optional
    headers: {'Access-Control-Allow-Origin': '*'},  // optional
    ACL: 'public-read',                                 // this is the default - set to `public-read` to let anyone view uploads
}));

// Set up mailer

mailer.setupMailer(app)
// Setup basic auth on private router
const users = {}
users[process.env.ADMIN_USERNAME] = process.env.ADMIN_PASSWORD
privateRouter.use(basicAuth({
  users:users,
  unauthorizedResponse:'Please login in to view this part of the site'
}))

// Routes
require('./src/routes/submissions_routes')(app, privateRouter)

// Publish route

privateRouter.post('/feed',(req,res)=>{
  console.log("ATTEMPTING TO PUBLISH ")
  updateFeed((err,result)=>{

    console.log("generated feed ", err, result)
    if (err){

      res.status(500)
      res.render('error', { error: err })

    }
    else{
      res.json(result)
    }
  })
})
// Password Protected Routes

app.use('/private/', privateRouter)
app.get('/feed', (req,res)=>{
  console.log("ATTEMPTING TO PUBLISH ")
  updateFeed((err,result)=>{

    console.log("generated feed ", err, result)
    if (err){

      res.status(500)
      res.render('error', { error: err })

    }
    else{
      res.json(result)
    }
  })
})

// Route any unmatched route to the React application

app.use((eq, res)=>{
  console.log("USING CATCHALL")
  res.sendfile('client/build/index.html')
});

app.listen(port, () => console.log(`Listening on port ${port}`));

