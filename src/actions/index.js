import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

const apiKey = 'fb1704e54227ebad4b882ea6e3010ccd';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export function fetchSongId(title){
  return function (dispatch){
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch(`http://api.musixmatch.com/ws/1.1/track.search?&q_track=${title}&page_size=1&s_track_rating=desc&apikey=${apiKey}`).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      if (json.message.body.track_list.length > 0) {
        const jsonSong = json.message.body.track_list[0].track;
        const musicMatchId = jsonSong.track_id;
        const artist = jsonSong.artist_name;
        const title = jsonSong.track_name;
        fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
      } else {
        console.log('Sorry dudette or dude, err, may I should just call you a person. Unless you\'re a robot. Hmm... let\'s start over. Sorry requestor,  we couldn\'t find it');
      }
    });
  };
}

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export function fetchLyrics (title, artist, musicMatchId, localSongId, dispatch){
  return fetch(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${musicMatchId}&apikey=${apiKey}`).then(
    response => response.json(),
    error => console.log('an error occurred', error)
  ).then(function(json){
    if (json.message.body.lyrics){
      let lyrics = json.message.body.lyrics.lyrics_body;
      lyrics = lyrics.replace('"', '');
      const songArray = lyrics.split(/\n/g).filter(entry => entry!='');
      dispatch(receiveSong(title, artist, localSongId, songArray));
      dispatch(changeSong(localSongId));
    } else {
      console.log('we couldn\'t locate the lyrics for this song');
    }
    
  });
}

export const receiveSong = (title, artist, songId, songArray) => ({
  type: types.RECEIVE_SONG,
  songId,
  title,
  artist,
  songArray,
  receivedAt: Date.now()
});

