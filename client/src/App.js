import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components';
import SubmitForm from './components/SubmitForm';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto'

const Container = styled.div`
 display:grid;
 align-content: center;
 justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <Container>
       <Typography variant="display3" gutterBottom> Long Live The New Sound </Typography>
       <Typography variant='body2' style={{marginBottom:'10px'}}>
        This is a podcast for artists, archivists, producers and other interested parties to share and hear work that experiments in sound.

        That means we accept work from genres including:
        <ul>
          <li>Sound and radio art</li>
          <li>Experimental audio documentary</li>
          <li>Plunderphonic and audio collage</li>
          <li>Acoustic ecology and soundscapes</li>
          <li>Sound rich fiction</li>
          <li>Experimental interviews</li>
          <li>Etc...</li>
        </ul>

        We aren’t a show in the traditional sense. There is no host, no weekly theme, no ads, no clock and no release schedule. Instead this is an ongoing space where different kinds of audio is perpetually being submitted and added to the catalogue. A playlist where you download or stream for as long as you like, listen actively, passively, on your commute or in your shower. No interruptions from DJs, hosts or ad breaks.
      </Typography>

      <Typography variant='display2' style={{marginBottom:'10px'}}>
        Submit Your Work
      </Typography>

      <SubmitForm />
        <Typography variant='display2' style={{marginBottom:'10px'}} gutterBottom>
          Submission Guidelines
        </Typography>
        <Typography variant='body2' style={{marginBottom:'30px'}}>
          <ul>
            <li>Minimum time: 5 seconds</li>
            <li>Maximum time: 1 hour</li>
            <li>Format: Mp3</li>
            <li>Experimental, strange, genre-bending, audio centric work</li>
            <li>Do not submit music but you may have music within the piece submitted, please.</li>
            <li>Remove any station or host intro/outro unless it is a necessary part of the piece (include all credits in the written description)</li>
          </ul>

          This is a non commercial vehicle. Nobody is making money from this and nobody intends to. The artist maintains all the right to their own work.

          If you have either created something, or have access to material (historic or otherwise) please submit! We screen each piece to prevent hateful content and to ensure that it fits into the guidelines listed here. But we hope to be able to include almost everything submitted.

          Be sure to include your name (or artist, collective name) and a brief description or information about the work. You may also include a link to your work online, and social media links. This will appear in the episode description. We also ask that you include an email address in case we need to contact you about the work - your contact information will not be included in the podcast description unless you want it to.
        </Typography>

      <Typography variant='display2' style={{marginBottom:'10px'}}>
        Who are we?
      </Typography>
      <Typography variant='body2' style={{marginBottom:'30px'}}>
        A couple of people who enjoy listening.
      </Typography>
      <Typography variant='display2' style={{marginBottom:'10px'}}>
        What happens next?
     </Typography>
     <Typography variant='body2' style={{marginBottom:'30px'}}>
       We will review the submision to make sure it meets the guidelines and email you once it’s live. You can contact us at: <a href="mailto:longlivethenewsound@gmail.com">longlivethenewsound@gmail.com</a>.
        After you have submitted your piece, you will receive a confirmation email. We review each piece before it appears in the feed and will let you know when it appear on the show.
        Direct any questions to: <a href="mailto:longlivethenewsound@gmail.com">longlivethenewsound@gmail.com</a>

        If you hear something you want know more about, check the episode description for information provided by the uploader. If you want to support any of the work you find on this show, please find the artists directly.
     </Typography>

     <Typography variant='display2' style={{marginBottom:'10px'}}>
      Additional Resources
    </Typography>
    <Typography variant='body2' style={{marginBottom:'30px'}}>
      Creative Audio Archive
      Ubu Web : Sound
      Earlid
      Third Coast Producer Index
    </Typography>

      </Container>
    );
  }
}

export default App;
