import React, { useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Listen(props){
    const [episode, updateEpisode] = useState(null)
    const [error, updateError] = useState(false)
    const slug = props.match.params.slug


    useEffect(()=>{
        fetch(`/entry/${slug}`).then(r=>r.json()).then((episode=>{
            updateEpisode(episode)
            console.log(episode)
        })).catch((err)=>{
            updateError(true)
        })
     
    },props.match.params.slug)

    return (    
      <div>
        {error && <h1>Could not find episode {slug}</h1>}
        {episode && 
            <React.Fragment>
                <h1>{episode.title}</h1>
                <ReactAudioPlayer
                      src= {episode.audioURL}
                      autoPlay={false}
                      controls
                />
                <p>{episode.description}</p>
                <p><a target="_blank" href={episode.artistLink}>{episode.submitor }</a></p>
                <p>More from the artist at {episode.socialMedia}</p>
                <p>Listen to or submit more new sounds at <a href="http://www.longlivethenewsound.com/">www.longlivethenewsound.com</a></p>
            </React.Fragment>
        }
      </div>
    );
}

