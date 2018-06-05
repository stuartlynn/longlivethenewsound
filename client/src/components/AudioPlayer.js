import React from 'react'
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';

class AudioPlayer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { trackTitle, streamUrl} = this.props;
    return (
      <ReactAudioPlayer
        src= {this.props.streamUrl}
        autoPlay = {this.props.autoPlay}
        controls
      />
    );
  }
}

export default AudioPlayer;
