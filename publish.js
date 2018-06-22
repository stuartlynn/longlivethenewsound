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
  enclosure:{
    url:"https://feed.longlivethenewsound.com/episodes/FROGS_forlltns.mp3",
    size:"722650",
    type:"audio/mpeg"
  },
  guid:1,
  date:'May 27, 2018',
  itunesDuration:'00:00:45'
});

feed.addItem({
  title:'About Process',
  description: "Audio collage about audio collages" ,
  url:'https://feed.longlivethenewsound.com/episodes/forlltns_process.mp3',
  enclosure:{
    url:"https://feed.longlivethenewsound.com/episodes/forlltns_process.mp3",
    size:"3262588",
    type:"audio/mpeg"
  },
  guid:2,
  date:'May 27, 2018',
  itunesDuration:'00:03:23'
});

feed.addItem({
  title:'Bellhop',
  description:  '"We were lied to." This short audio work was produced for the 2016 #ShortDocs competition held by the Third Coast International Audio Festival. This piece was inspired by the "film noir" mini-movie produced by Manual Cinema. In addition to original music by Garrett D. Tiedemann there are music tracks by Manual Cinema within the mix as required by the competition for this year. https://twitter.com/whitewhalepod, https://www.facebook.com/whitewhalepod/, https://www.instagram.com/whitewhalepod/, http://www.cynarpictures.com/',
  url:'https://longlivethenewsound.s3.amazonaws.com/113482df-56df-451b-b138-e0079a1b0ca2_/submissions/Bellhop_Third_Coast_2016_Shortdocs_Submission_.mp3',
  enclosure:{
    url:"https://longlivethenewsound.s3.amazonaws.com/113482df-56df-451b-b138-e0079a1b0ca2_/submissions/Bellhop_Third_Coast_2016_Shortdocs_Submission_.mp3",
    size:"4023720",
    type:"audio/mpeg"
  },
  guid: '5b1898bbab9452000429e904',
  date:'June 6, 2018',
  itunesDuration:'00:03:23'

})

feed.addItem({
  title:'The Accent Mark in Ancient Greek',
  description:  'I made this for an audio club in the Bay Area in response to the prompted theme, "You should know.". \n Artist: <a href="www.theworldaccordingtosound.org">The World According to Sound</a> \n Twitter: <a href="@thewatsound">@thewatsound</a>',
  url: 'https://s3.amazonaws.com/longlivethenewsound/f8f4bfed-c6ca-4385-a703-779987986c32_/submissions/HOF.AccentMarkInAncientGreek.mp3',
  enclosure:{url:'',
    url: 'https://s3.amazonaws.com/longlivethenewsound/f8f4bfed-c6ca-4385-a703-779987986c32_/submissions/HOF.AccentMarkInAncientGreek.mp3',
    size: 3040234,
    type:'audio/mpeg'
  },
  guid: '5b19bd5ed1c9ba0004df3f65',
  date:'June 9, 2018',
  itunesDuration:'00:03:23'

})
const xml = feed.buildXml();
fs.writeFile('rss.xml',xml,function(err){
  console.log('done')
})
