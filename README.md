# Long Live The New Sound
[https://longlivethenewsound.com](https://longlivethenewsound.com)

Long Live The New Sound is a podcast / platform for deseminating experimental audo. In contrast to traditional podcasts in which
episodes are curated, have a presenter, seek to build audience and have adverts, Long Live The New Sound aims to simply aggregate 
together content and publish it directly to the web as a podcast. 

You can subscribe to the podcast at 

- [ITunes](https://itunes.apple.com/us/podcast/long-live-the-new-sound/id1393853495?mt=2)
- [RSS](https://feed.longlivethenewsound.com/rss.xml)
- [PocketCasts](https://pca.st/sn8i)
- Or wherever you get your podcasts 

Follow us on twitter [@the_newsound](https://twitter.com/the_newsound)

This repo contains the source code that powers everything from the submission website to the podcast its self. 

## Running Locally

```bash
yarn 
cd frontend 
yarn 
cd ../
yarn run dev
```

Comming soon : a docker compose environment to easily run everything locally 

## Code Layout 

The code is split in to two parts, the server and the client side. 

Client is built with React and lives in the [/client](https://github.com/stuartlynn/longlivethenewsound/tree/master/client) directory.
Server is built using express and lives in the root directory. Entry point is [server.js](https://github.com/stuartlynn/longlivethenewsound/blob/master/server.js)


## Config and environment variables 

There are a few things that need to be configured to let the site work. These are all controlled through environment variables that
can be specified by a .env file. An example of this can be found in the [.env.example]() file. 

- AWS_ACCESS_KEY_ID : The access key for the AWS account your using
- AWS_SECRET_ACCESS_KEY : The secret access key for the AWS account your using
- MONGO_CONNECTION : The mongo connection string for the database where we store the submissions
- ADMIN_USERNAME : The username to use for access to the /admin part of the site where the feed can be updated and submissions can be reviewed
- ADMIN_PASSWORD= : The password to use for access to the /admin part of the site where the feed can be updated and submissions can be reviewed
- NOTIFICATION_EMAIL_ADDRESS : A gmail email address to use for notifications 
- NOTIFICATION_EMAIL_PASSWORD : The password for the gmail notification account
- REVIEWERS_EMAILS : A comma seperated list of reviewers who will be notified when a new submission is made.


## Deploying 

Assuming you are running on heroku, you can use the deploy script to push updates live. 

```bash
./deploy.sh
``` 

## Services that we run on

The podcast uses a few different services to run. 

- [Heroku](http://heroku.com/): For hosting the app, could easily be swaped out for another hosting service like ec2 etc 
- [S3](https://aws.amazon.com/s3/): For hosting the audio files along with the rss feed for the podcast
- [CloudFront](https://aws.amazon.com/cloudfront/): As a content distribution network and to provide and apple compatbale SSL cert 
- [letsencrypt](https://letsencrypt.org/): For obtatining an itunes compatable ssl certificate.
- [mongoDB/mlab](https:://mlab.com): For holding the submissions databse.
- [Gmail](http://google.com/gmail): For sending notifications to artists when they submit and to alert reviewers.

