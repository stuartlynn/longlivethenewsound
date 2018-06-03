const Podcast = require('podcast')
var fs = require('fs');

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

feed.addItem({
  title:'FROGS',
  description: "Frogs recorded outside Puerto Maldonado, Peru",
  url:'https://feed.longlivethenewsound.com/episodes/FROGS_forlltns.mp3',
  enclosure:{url:'https://feed.longlivethenewsound.com/episodes/FROGS_forlltns.mp3',
    file:'/Users/slynn/Downloads/Frogs_mini.mp3'
  },
  guid:1,
  date:'May 27, 2018',
  itunesDuration:'00:00:45'
});

feed.addItem({
  title:'About Process',
  description: "Audio collage about audio collages" ,
  url:'https://feed.longlivethenewsound.com/episodes/forlltns_process.mp3',
  enclosure:{url:'https://feed.longlivethenewsound.com/episodes/forlltns_process.mp3',
    file:'/Users/slynn/Downloads/forlltns_process.mp3'
  },
  guid:2,
  date:'May 27, 2018',
  itunesDuration:'00:03:23'
});

const xml = feed.buildXml();
fs.writeFile('rss.xml',xml,function(err){
  console.log('done')
})
