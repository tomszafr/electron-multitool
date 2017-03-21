const React = require('react');
const nodeID3 = require('node-id3');
const async = require('async');

import FileList from "./FileList.jsx"
import {showModal, openFile, readFile, saveChanges, createFile} from './../node-methods/file-operations.jsx'

const openOptions = {
  properties: ['multiSelections'],
  filters: [
    {name: 'Music Files', extensions: ['mp3']}
  ]
}

const PlayerTab = React.createClass({
  addCallback: function(elements) {
    let lastSong = 0
    if (this.props.musicPlayer.playlist.length) {
      lastSong = this.props.musicPlayer.playlist.length
    }

    let newSongs = elements.map((element, index) => {
      return { path: element, index: index+lastSong, tags: {} }
    })
    this.props.onAddSongs(newSongs)
  },
  loadCallback: function(elements) {
    let playlist = elements.map((element, index) => {
      return { path: element, index: index, tags: {} }
    })
    this.props.onLoadPlaylist(playlist)
  },
  loadTags: async function() {
    let elements = this.props.musicPlayer.playlist
    function addTags(element, index) {
      if (Object.keys(element.tags).length === 0) {
        let tags = nodeID3.read(element.path)
        return Object.assign(element, { tags: tags })
      } else {
        return element
      }
    }
    let playlist = await elements.map(addTags)
    this.props.onLoadPlaylist(playlist)
  },
  handleOpen: function(event) {
    if (event.target.innerText === 'Load') {
      openFile('music', openOptions, this.loadCallback)
    } else {
      openFile('music', openOptions, this.addCallback)
    }
  },
  playFile: function(fileID) {
    this.props.onUpdateCurrentSong(fileID)
  },
  render: function() {
    return (
      <div className="sectionContainer">
        <FileList currentSong={this.props.musicPlayer.currentSongIndex} handleClick={this.playFile}>{this.props.musicPlayer.playlist}</FileList>
        <button onClick={this.handleOpen}>Load</button>
        <button onClick={this.handleOpen}>Add more</button>
        <button onClick={this.loadTags}>Load Tags</button>
      </div>
    )
  }
});

module.exports = PlayerTab;
