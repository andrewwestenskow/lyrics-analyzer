import React from 'react'

const SongInfo = props => {
  const { song } = props
  return (
    <section className="Song-Info">
      <div className="song-title-image-hold">
        <img
          src={song.song_art_image_url}
          className="song-image"
          alt={song.full_title}
        />
        <div className="song-text-hold">
          <h1 className="song-title">{song.full_title}</h1>
          <span className="song-link">
            Read the lyrics on{' '}
            <a rel="noopener noreferrer" target="_blank" href={song.url}>
              Genius.com
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
export default SongInfo

/*
  song.header_image_url
  song.full_title
  song.song_art_image_url

*/
