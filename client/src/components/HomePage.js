import React, {useEffect, useState} from 'react';
import SubmitForm from './SubmitForm';
import {HeaderLarge, HeaderSmall, Text} from './Type';

import ReactAudioPlayer from 'react-audio-player';

export default props => {
  const [current, updateCurrent] = useState(null);
  const [next, updateNext] = useState(null);
  const [shouldAutoplay, updateAutoplay] = useState(false);

  const [entries, updateEntries] = useState(null);
  useEffect(() => {
    fetch('/entry')
      .then(r => r.json())
      .then(ents => {
        updateEntries(ents);
        updateCurrent(ents[Math.floor(Math.random() * ents.length)]);
        updateNext(ents[Math.floor(Math.random() * ents.length)]);
      });
  }, []);

  return (
    <div>
      <HeaderLarge>LLtNS : Long Live the New Sound</HeaderLarge>
      <Text>
        The anti-podcast podcast for creative audio. Freeform & public access,
        always.
        <br />
        Listen: <a href="/episodes">Episodes</a>
        {' | '}
        <a href="https://feed.longlivethenewsound.com/rss.xml">RSS</a> {' | '}
        <a href="https://pca.st/sn8i">PocketCasts</a>
        {' | '}
        <a href="https://radiopublic.com/long-live-the-new-sound-GbxBeN">
          {' '}
          {' | '}
          RadioPublic
        </a>
        {' | '}
        + wherever you get your podcasts (and itunes)
        <br />
        For More: <a href="https://twitter.com/lltinsound">
          @the_newsound
        </a>{' '}
        {' | '}
        <a href="https://tinyletter.com/LLtNS">Newsletter</a>
      </Text>

      {current && next && (
        <React.Fragment>
          <HeaderSmall>Listen to the new sound</HeaderSmall>
          <ReactAudioPlayer
            style={{width: '100%'}}
            src={current.audioURL}
            autoPlay={shouldAutoplay}
            controls
            onEnded={() => {
              updateCurrent(next);
              updateNext(entries[Math.floor(Math.random() * entries.length)]);
              updateAutoplay(true);
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style>
              Now: <a href={`/listen/${current.slug}`}>{current.title}</a>
            </Text>
            <Text>
              Next: <a href={`/listen/${next.slug}`}>{next.title}</a>
            </Text>
          </div>
          <Text>
            <a href="/episodes">All episodes</a>
          </Text>
        </React.Fragment>
      )}

      <HeaderSmall>About & Hello </HeaderSmall>
      <Text>
        LLtNS is a freeform, non-commercial podcast where artists, amatures,
        archivists, producers... anyone really can contribute episodes as they
        like. Episodes are presented as they are contributed without hosts,
        without ads and without curation.
      </Text>

      <Text>
        The goal is to provide <b>a fully open space for sonic-play</b>
      </Text>
      <Text>Think of it like a public access podcast for creative audio.</Text>

      <HeaderSmall>Submit Your Work</HeaderSmall>

      <Text>Before submitting please read our guidelines below.</Text>

      <SubmitForm />
      <HeaderSmall>Contribution Guidelines</HeaderSmall>
      <Text>
        We accept contributions from the genre-less, genre-bending, including
        (but not limited to)
        <ul>
          <li>Sound & radio arts</li>
          <li>Acoustic ecology & field recording</li>
          <li>ASMR</li>
          <li>Creative meditation</li>
          <li>Mixtape storytelling</li>
          <li>Experimental documentary & Interview</li>
          <li>Collage & plunderphonics</li>
          <li>Field recording & environmental remixes</li>
          <li>Radical Soundwalks </li>
          <li>Fiction/non-fiction bending narratives & poetry</li>
          <li>Sonic Experiments & Ambience (but not music**)</li>
          <li>Variations on Ferk</li>
          <li>Archival audio works from the past</li>
          <li>Remixes of work already on the LLtNS feed</li>
          <li>… and anything else that we may not have thought to list. </li>
        </ul>
      </Text>

      <Text>
        We don’t curate the work but we are screening to make sure the work
        meets our stated guidelines, does not include hateful content, and is in
        the spirit of experimentation. Please bear with us as we figure out what
        exactly that means.
      </Text>
      <Text>
        Note: <b>This is not a music podcast</b>. We accept the musical & works
        that include music, but we do not accept music. This an an outlet for
        non-music creative audio.
      </Text>
      <HeaderSmall>Technical Guidelines</HeaderSmall>
      <Text>
        <ul>
          <li>Minimum time: 5 seconds</li>
          <li>
            Maximum time: 1 hour (If your piece is longer than an hour, please
            email us and we will try to include it to the feed)
          </li>
          <li>
            <b>Format: Mp3</b>
          </li>
          <li>Experimental, strange, genre-bending, audio centric work</li>
          <li>
            Please do not submit music but you may have music within the piece
            submitted
          </li>
          <li>
            Remove any station or host intro/outro unless it is a necessary part
            of the piece (include all credits in the written description)
          </li>
        </ul>
        This is a non commercial vehicle. Nobody is making money from this and
        nobody intends to. LLtNS will include contributed work on the feed, the
        livestream and links in the newsletter, but the artist maintains all the
        rights to their own work.
        <br />
        If you have either created something, or have access to material
        (historic or otherwise) please submit! We screen each piece to prevent
        hateful content and to ensure that it fits into the guidelines listed
        here. But we hope to be able to include almost everything submitted.
        <br />
        Be sure to include your name (or artist, collective name) and a brief
        description or information about the work. You may also include a link
        to your work online, and social media links. This will appear in the
        episode description.
        <br />
        <b>We also ask that you include an email address</b> in case we need to
        contact you about the work - your contact information will not be
        included in the podcast description unless you want it to. This is just
        so we can contact you if something goes wrong.
      </Text>

      <HeaderSmall>Listening to the Feed</HeaderSmall>
      <Text>
        LLtNS is not a traditional sounding podcast. We do not have hosts or ads
        or release schedules. Episodes come out as they are contributed by
        sound-makers around the world and that’s reflected in huge variety of
        audio on the feed. You’ll find everything from a{' '}
        <a href="http://www.longlivethenewsound.com/listen/100-episodes-of-simplesoundscapes-raw">
          5 hour soundscape
        </a>{' '}
        to{' '}
        <a href="http://www.longlivethenewsound.com/listen/mindferk">
          a 14 second mouth sound
        </a>
        .
        <br />
        Listen to LLtNS as a randomized livestream from our website, or download
        the feed from wherever you get your podcasts.
        <br />
        Find a list of episodes & artists in <a href="/episodes">Episodes</a>.
      </Text>
      <HeaderSmall>Who is behind this?</HeaderSmall>
      <Text>
        The feed is maintained by Adriene & Stuart. We listen to the feed. We
        make sure the sounds stay available and that the contribution process is
        easy. Sometimes we send out a{' '}
        <a href="https://tinyletter.com/LLtNS">newsletter</a> about what’s new,
        sometimes we tweet about the new sounds{' '}
        <a href="https://twitter.com/LLtNSound">@LLtNSound</a>. But the sounds
        behind the feed were contributed by people around the world. Find the
        complete list in <a href="/episodes">Episodes</a>.
        <br />
        You can always email us with questions, concerns or just to chat:{' '}
        <a href="mailto:longlivethenewsound@gmail.com">
          longlivethenewsound@gmail.com
        </a>
      </Text>

      <HeaderSmall>What happens next?</HeaderSmall>
      <Text>
        We review each piece before it appears in the feed and will let you know
        when it appear on the show. Please direct any questions to:
        <a href="mailto:longlivethenewsound@gmail.com">
          longlivethenewsound@gmail.com
        </a>
        . If you hear something you want know more about, check the episode
        description for information provided by the uploader. If you want to
        support any of the work you find on this show, please find the artists
        directly.
      </Text>
    </div>
  );
};
