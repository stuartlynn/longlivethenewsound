import React from 'react'
import Typography from '@material-ui/core/Typography';
import SubmitForm from './SubmitForm';

const HeaderLarge = (props)=>(
  <Typography style= {{fontSize:'3.0rem'}} variant="display3" gutterBottom>
    {props.children}
  </Typography>
)

const HeaderSmall = (props)=>(
  <Typography variant="display2" style={{marginBottom:'10px', marginTop:'20px', fontSize: '2rem'}} gutterBottom>
    {props.children}
  </Typography>
)

const Text = (props)=>(
  <Typography variant="body2" style={{marginBottom:'10px', fontWeight: 300}} gutterBottom>
    {props.children}
  </Typography>
)

export default  (props)=>{
  return (
    <div>
      <HeaderLarge> Long Live The New Sound </HeaderLarge>
        <Text>
          An anti-podcast podcast. Subscribe at: <a href='https://itunes.apple.com/us/podcast/long-live-the-new-sound/id1393853495?mt=2'>ITunes</a> <a href='https://feed.longlivethenewsound.com/rss.xml'>RSS</a> <a href='https://pca.st/sn8i'>PocketCasts</a> <a href='https://twitter.com/the_newsound'>@the_newsound</a>
        </Text>

      <HeaderSmall>
        Submit Your Work
      </HeaderSmall>

      <Text>
        Before submitting please read our guidelines below.
      </Text>

      <SubmitForm />
      <HeaderSmall>
        About & Submission Guidelines
      </HeaderSmall>
       <Text>
        This is a podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound.

        That means we accept work from genres including:
        <ul>
          <li>Sound and radio art</li>
          <li>Experimental audio documentary</li>
          <li>Plunderphonic and audio collage</li>
          <li>ASMR experiments</li>
          <li>Acoustic ecology and soundscapes</li>
          <li>Curious Ambient</li>
          <li>Form bending fiction</li>
          <li>Experimental interviews</li>
          <li>Etc...</li>
        </ul>

      </Text>

      <Text>
        Note that while we want to include almost all the submissions that come through,
        we are screening to make sure the work meets our stated guidelines, does not
        include hateful content, and is in the spirit of experimentation.
        Please bear with us as we figure out what exactly that means.
      </Text>

      <HeaderSmall>
        Technical Guidelines
      </HeaderSmall>
      <Text>
        <ul>
          <li>Minimum time: 5 seconds</li>
          <li>Maximum time: 1 hour</li>
          <li>Format: Mp3</li>
          <li>Experimental, strange, genre-bending, audio centric work</li>
          <li>Please do not submit music but you may have music within the piece submitted</li>
          <li>Remove any station or host intro/outro unless it is a necessary part of the piece (include all credits in the written description)</li>
        </ul>

        This is a non commercial vehicle. Nobody is making money from this and nobody intends to. The artist maintains all the right to their own work.
        <br />

        If you have either created something, or have access to material (historic or otherwise) please submit! We screen each piece to prevent hateful content and to ensure that it fits into the guidelines listed here. But we hope to be able to include almost everything submitted.

        <br />

        Be sure to include your name (or artist, collective name) and a brief description or information about the work.
        You may also include a link to your work online, and social media links. This will appear in the episode description.
        We also ask that you include an email address in case we need to contact you about the work - your contact information
        will not be included in the podcast description unless you want it to.

      </Text>
      <HeaderSmall>
         About the Show
      </HeaderSmall>
      <Text>
        We aren’t a show in the traditional sense. There is no host, no weekly theme, no ads, no clock and no release schedule. Instead this is an ongoing space where different kinds of audio is being perpetually being submitted and added to the catalogue. Think of it like a playlist where you download or stream for as long as you like, listen actively, passively, on your commute or in your shower. No interruptions from DJs, hosts or ad breaks.
      </Text>
      <HeaderSmall>
        Who are we?
      </HeaderSmall>
      <Text>
        A couple of people who enjoy listening.
      </Text>
      <HeaderSmall>
        What happens next?
      </HeaderSmall>
      <Text>
        We review each piece before it appears in the feed and will let you know when it
        appear on the show. Please direct any questions to:
        <a href="mailto:longlivethenewsound@gmail.com">longlivethenewsound@gmail.com</a>  If you hear something you want know more about,
        check the episode description for information provided by the uploader.
        If you want to support any of the work you find on this show, please find the artists directly.
      </Text>
  </div>)
}

