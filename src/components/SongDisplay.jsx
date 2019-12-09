import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextLyric, restartSong } from './../actions';

const SongDisplay = ({ dispatch, song }) => {
  const { title, artist, songArray, arrayPosition, id } = song;
  const currentLine = songArray[arrayPosition];
  let action;
  return (
    <div>
      <h1>{title}</h1>
      <h4>{artist}</h4>
      <hr/>
      {/* <div onClick={event => {
        event.preventDefault();
        dispatch(nextLyric(id));
      } else {
        dispatch(restartSong(id));
      }
    }}> */}
      <div onClick={() => {
        if(!(arrayPosition === songArray.length - 1)) {
          dispatch(nextLyric(id));
        } else {
          dispatch(restartSong(id));
        }
      }}>
        <h1>
          {currentLine}
        </h1>
      </div>
    </div>
  );
};

SongDisplay.propTypes = {
  song: PropTypes.object,
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  songArray: PropTypes.array,
  arrayPosition: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  let songInfo;
  const song = state.songsById[state.currentSongId];
  if(!state.songsById[state.currentSongId].isFetching){
    songInfo = {
      id: song.songId,
      artist: song.artist,
      title: song.title,
      songArray: song.songArray,
      arrayPosition: song.arrayPosition
    };    
  } else {
    songInfo = {
      artist: '',
      title: '',
      songArray: '',
      arrayPosition: ''
    };
  }
  return {
    song: songInfo
  };
};

export default connect(mapStateToProps)(SongDisplay);
