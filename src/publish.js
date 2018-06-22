const Submission = require('./models/submission')
const Podcast = require('podcast')
const AWS = require('aws-sdk');
const fs = require('fs')
const utf8 = require('utf8')


const submissionToFeedItem = (submission) => {
  return {
    title: utf8.encode(submission.title),
    description: utf8.encode(createFullDescription(submission)),
    url: submission.audioURL,
    enclosure:{
      url:submission.audioURL,
      size: submission.fileSize,
      type : submission.fileType
    },
    guid: submission._id.toString(),
    date: submission.created_at,
    itunesDuration: submission.duration
  }
}

const invalidateCloudFront = (cb) =>{
  const cloudfront = new AWS.CloudFront();
  const params = {
    DistributionId : 'E2CYEU9ACNI2J0',
    InvalidationBatch: {
      CallerReference: Date().toString(),
      Paths:{
        Quantity: 1,
        Items:[
          '/rss.xml'
        ]
      }
    }
  }
  cloudfront.createInvalidation(params, (err,data)=>{
    if (err) cb(err,null);
    else cb(null,data)
  })
}
const updateFeed =(cb)=>{
  createFeed((json,xml)=>{
    const s3 = new AWS.S3({
      Bucket: 'longlivethenewsound'
    })
    s3.putObject({
      Bucket: 'longlivethenewsound',
      Key: 'rss.xml',
      Body: Buffer.from(xml,'ascii'),
      ACL: 'public-read',
      ContentType: 'text/xml'
    }, (err,data)=>{
      if(err){
        console.log("FAILED TO UPLOAD to S3 ", err)
        cb(err)
      }
      else{
        invalidateCloudFront((err,data)=>{
          if(err){
            cb(err,null)
          }
          else{
            cb(null, json)
          }
        })
      }
    })
  })
}

const createFullDescription= (submission)=>{
  const social = (submission.socialMedia && submission.socialMedia.length > 0 ?
    `For more check out: ${submission.socialMedia}` : '')

  const artist = (submission.artistLink && submission.artistLink.length > 0 ?
    `For more about the artist: ${submission.artistLink}` : '')

  return `Artist : ${submission.submitor}
${submission.description}

${social}
${artist}
`
}
const createFeed =(cb)=>{

  feed = new Podcast({
    title:'Long Live The New Sound',
    description:'This is a podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound. Share work at longlivethenewsound.com',
    siteUrl:'longlivethenewsound.com',
    feed_url: 'https://s3.amazonaws.com/longlivethenewsound/rss.xml',
    imageUrl:'https://s3.amazonaws.com/longlivethenewsound/LLTNSLogo.jpg',
    author:'longlivethenewsound',
    itunesAuthor: 'longlivethenewsound',
    language:'en-us',
    itunesSubtitle: 'A podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound.',
    itunesOwner:{
      name:'Long Live The New Sound',
      email:'longlivethenewsound@gmail.com'
    },
    itunesExplicit: true,
    itunesCategory: [{text:'Society & Culture', subcats: [{text:'Personal Journals'}]}],
    itunesImage: 'https://s3.amazonaws.com/longlivethenewsound/LLTNSLogo.jpg',
    itunesType:''
  })

  createFeedItems((items)=>{
    items.map((item)=> feed.addItem(item))
    const xml = feed.buildXml();
    cb(feed, xml)
  })

}

const createFeedItems = (cb)=>{
  Submission.find({state: 'approved'}).sort([['created_at', 1]]).exec( (err,collection) =>{
    console.log('error ', err, ' collection ', collection)
    cb(collection.map( s=> submissionToFeedItem(s)))
  })
}

module.exports = updateFeed
