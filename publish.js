const Podcast = require('podcast')
var fs = require('fs');

feed = new Podcast({
  title:'Long Live The New Sound',
  description:'This is a podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound. Submit your work at longlivethenewsound.com',
  siteUrl:'longlivethenewsound.com',
  feed_url: 'https://s3.amazonaws.com/longlivethenewsound/rss.xml',
  imageUrl:'https://s3.amazonaws.com/longlivethenewsound/LLTNSLogo.jpg',
  author:'longlivethenewsound',
  itunesAuthor: 'longlivethenewsound',
  itunesSubtitle: 'A podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound.',
  itunesOwner:{
    name:'Long Live The New Sound',
    email:'longlivethenewsound@gmail.com'
  },
  itunesExplicit: true,
  itunesCategory: ['Personal Journals' ],
  itunesImage: 'https://s3.amazonaws.com/longlivethenewsound/LLTNSLogo.jpg',
  itunesType:''
})

feed.addItem({
  title:'FROGS',
  description: "Frogs recorded outside Puerto Maldonado, Peru",
  url:'https://s3.amazonaws.com/longlivethenewsound/episodes/FROGS_forlltns.mp3',
  guid:1,
  date:'May 27, 2018'
});

feed.addItem({
  title:'About Process',
  description: "Audio collage about audio collages" ,
  url:'https://s3.amazonaws.com/longlivethenewsound/episodes/forlltns_process.mp3',
  guid:2,
  date:'May 27, 2018'
});

const xml = feed.buildXml();
fs.writeFile('rss.xml',xml,function(err){
  console.log('done')
})
