import React, {useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {HeaderLarge, HeaderSmall, Text} from './Type';

export default function Listen(props) {
  const [episode, updateEpisode] = useState(null);
  const [error, updateError] = useState(false);
  const slug = props.match.params.slug;

  useEffect(() => {
    fetch(`/entry/${slug}`)
      .then(r => r.json())
      .then(episode => {
        updateEpisode(episode);
        console.log(episode);
      })
      .catch(err => {
        updateError(true);
      });
  }, props.match.params.slug);

  return (
    <React.Fragment>
      <HeaderLarge>Long Live the New Sound</HeaderLarge>
      <Text>
        An anti-podcast podcast. Find out more and submit your own work at{' '}
        <a href="http://www.longlivethenewsound.com">longlivethenewsound.com</a>
      </Text>

      {error && <h1>Could not find episode {slug}</h1>}
      {episode && (
        <React.Fragment>
          <HeaderSmall>{episode.title}</HeaderSmall>
          <ReactAudioPlayer src={episode.audioURL} autoPlay={false} controls />
          <Text>{episode.description}</Text>
          <Text>
            <a target="_blank" href={episode.artistLink}>
              {episode.submitor}
            </a>
          </Text>
          <Text>More from the artist at {episode.socialMedia}</Text>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
