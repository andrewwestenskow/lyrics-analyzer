import React, { Component } from 'react'
import phrase from '../../assets/phrase stats.png'
import song from '../../assets/Song stats.png'
import words from '../../assets/Word stats.png'

class LandingInfo extends Component {
  render() {
    return (
      <div className="half-landing-hold">
        <h1 className="landing-table-title">Analyze your favorite songs...</h1>
        <div className="landing-table-title">
          ..or choose from today's most popular:
        </div>
        <img
          style={{ marginTop: '25px' }}
          className="column-image"
          src={song}
          alt="Song stats example"
        />
        <p className="column-image-caption">
          <strong style={{ fontWeight: 700 }}>Learn about the song:</strong>{' '}
          artist, album, release, and number of writers. You can also see how
          many unique words appear as well as what we predict the hook is.
        </p>
        <img className="column-image" src={words} alt="Words stats example" />
        <p className="column-image-caption">
          <strong style={{ fontWeight: 700 }}>A picture is worth...</strong>{' '}
          Find out how many different words appear and how often they appear.
          Which pronouns appear the most? What is the most said word?
        </p>
        <img className="column-image" src={phrase} alt="Phrase stats example" />
        <p className="column-image-caption">
          <strong style={{ fontWeight: 700 }}>He said, she said...</strong> What
          is the most commonly repeated phrase? How many times is it said and
          what variations of it appear? To get started, search for a song above
          or take some inspiration from today's most popular hits. Just click on
          a song name to get started!
        </p>
      </div>
    )
  }
}
export default LandingInfo
