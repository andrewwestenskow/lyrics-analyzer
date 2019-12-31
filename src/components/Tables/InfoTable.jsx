/*
  - Title
  - Artist
  - Year
  - Album
  - Video?
  - Popularity index
*/

import React from 'react'
import { Descriptions, Card } from 'antd'

const InfoTable = ({ song, loading }) => {
  console.log(song)
  const { title, primary_artist, album, release_date, writer_artists } = song
  return (
    <Card title="Song stats" loading={loading}>
      {!loading && (
        <div className="chart-hold">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Title">{title}</Descriptions.Item>
            <Descriptions.Item label="Artist">
              {primary_artist.name}
            </Descriptions.Item>
            <Descriptions.Item label="Album">{album.name}</Descriptions.Item>
            <Descriptions.Item label="Released">
              {release_date}
            </Descriptions.Item>
            <Descriptions.Item label="# Writers">
              {writer_artists.length}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Card>
  )
}
export default InfoTable
