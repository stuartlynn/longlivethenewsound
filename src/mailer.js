const mailer = require('express-mailer');

const setupMailer = (app)=>{
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
}

const sendArtistConfirmationEmail= (submission, app)=>{
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

const sendReviewersConfirmationEmail= (submission, app)=>{
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

module.exports = {
  sendReviewersConfirmationEmail: sendReviewersConfirmationEmail,
  sendArtistConfirmationEmail: sendArtistConfirmationEmail,
  setupMailer : setupMailer
}
