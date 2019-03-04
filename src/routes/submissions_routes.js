const mongoose = require('mongoose');
const Submission = require('../models/submission');
const mailer = require('../mailer');
const slug = require('slug');

module.exports = (app, privateRouter) => {
  app.post('/entry/', (req, res) => {
    const title = req.body.title;
    const name = req.body.name;
    const submitor = req.body.submitor;
    const description = req.body.description;
    const email = req.body.email;
    const includeEmail = req.body.includeEmail;
    const submissionType = req.body.submissionType;
    const audioURL = req.body.audioURL;
    const artistLink = req.body.artistLink;
    const socialMedia = req.body.socialMedia;
    const acknowledgement = req.body.acknowledgement;
    const fileSize = req.body.audioFileSize;
    const fileType = req.body.audioFileType;
    const duration = req.body.duration;

    console.log('entry ', req.body);

    const s = Submission.create(
      {
        title: title,
        name: name,
        submitor: submitor,
        slug: slug(title),
        description: description,
        email: email,
        emailInclude: email,
        submissionType: submissionType,
        includeEmail: includeEmail,
        audioURL: audioURL,
        artistLink: artistLink,
        socialMedia: socialMedia,
        fileSize: fileSize,
        fileType: fileType,
        duration: duration,
        acknowledgement: acknowledgement,
        state: 'pending',
      },
      function(err, submission) {
        if (err) {
          res.write(400);
          res.json(err);
        } else {
          res.json(submission);
          mailer.sendArtistConfirmationEmail(submission, app);
          mailer.sendReviewersConfirmationEmail(submission, app);
        }
      },
    );
  });

  // Set up private API thats only accesable to authenticated users

  app.get('/entry/', (req, res) => {
    console.log('HERE TRYING TO GET ENTRIES');
    Submission.find({state: 'approved'}).exec((err, submissions) => {
      res.json(submissions);
    });
  });

  app.get('/entry/:slug', (req, res) => {
    console.log('attempting to get slug ', req.params.slug);
    Submission.find({slug: req.params.slug, state: 'approved'}).exec(
      (err, submission) => {
        if (err) {
          res.send(404);
        } else {
          res.json(submission[0]);
        }
      },
    );
  });

  privateRouter.get('/entry/', (req, res) => {
    Submission.find({})
      .sort([['created_at', 1]])
      .exec((err, submissions) => {
        res.json(submissions);
      });
  });

  privateRouter.post('/entry/:id/approve', (req, res) => {
    Submission.findById(req.params.id, (err, submission) => {
      if (err) {
        res.send(404);
      } else {
        submission.state = 'approved';
        submission.save((err, updatedSub) => {
          if (err) {
            res.send(500);
          } else {
            res.json(updatedSub);
          }
        });
      }
    });
  });

  privateRouter.post('/entry/:id/reject', (req, res) => {
    Submission.findById(req.params.id, (err, submission) => {
      if (err) {
        res.send(404);
      } else {
        submission.state = 'rejected';
        submission.save((err, updatedSub) => {
          if (err) {
            res.send(500);
          } else {
            res.json(updatedSub);
          }
        });
      }
    });
  });

  privateRouter.get('/entry/aproved', (req, res) => {
    Submission.find({state: 'aproved'}, (err, submissions) => {
      res.json(submissions);
    });
  });

  privateRouter.get('/entry/pending', (req, res) => {
    Submission.find({state: 'pending'}, (err, submissions) => {
      res.json(submissions);
    });
  });

  privateRouter.get('/entry/rejected', (req, res) => {
    Submission.find({state: 'rejected'}, (err, submissions) => {
      res.json(submissions);
    });
  });

  privateRouter.post('/publish', (req, res) => {});
};
