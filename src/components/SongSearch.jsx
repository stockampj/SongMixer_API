import React from 'react';
import { connect } from 'react-redux';
import { fetchSongId } from './../actions';
import PropTypes from 'prop-types';

function SongSearch({ dispatch }){
  let input;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(fetchSongId(input.value.trim()));
        input.value = '';
      }}>
        <input placeholder="Song Title" ref={node => {input = node;}}></input>
        <button>Search</button>
      </form>
    </div>
  );
}

SongSearch.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(SongSearch);
