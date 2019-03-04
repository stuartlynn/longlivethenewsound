import React, {useState, useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {HeaderLarge, HeaderSmall, Text} from './Type';

export default function ListPage(props) {
  const [episodes, updateEpisodes] = useState(null);

  useEffect(() => {
    fetch('/entry')
      .then(r => r.json())
      .then(res => {
        console.log(res);
        updateEpisodes(res);
      });
  }, []);

  return (
    <React.Fragment>
      <HeaderLarge>Long Live the New Sound</HeaderLarge>
      <Text>
        An anti-podcast podcast. Find out more and submit your own work at{' '}
        <a href="http://www.longlivethenewsound.com">longlivethenewsound.com</a>
      </Text>

      {episodes &&
        episodes.map(e => (
          <div key={e.title}>
            <HeaderSmall>{e.title}</HeaderSmall>
            <ReactAudioPlayer src={e.audioURL} controls autoPlay={false} />
            <Text>{e.description}</Text>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {e.artistLink ? 
                  <Text>
                    By:{' '}
                    <a
                      href={
                        e.artistLink.includes('http')
                          ? e.artistLink
                          : `http://${e.artistLink}`
                      }
                      target="_blank">
                      {e.submitor}
                    </a>
                  </Text>
              : <Text>Anonymous</Text>}
              <Text>
                <a href={`/listen/${e.slug}`} target="_blank">
                  Permlink
                </a>
              </Text>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
}
