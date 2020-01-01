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

const InfoTable = ({ song, loading, stats }) => {
  console.log(stats)
  const { title, primary_artist, album, release_date, writer_artists } = song
  return loading ? (
    <Card title="Loading Stats" loading={loading}></Card>
  ) : (
    <Card bodyStyle={{ padding: 0 }}>
      <div className="chart-hold">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Title">{title}</Descriptions.Item>
          <Descriptions.Item label="Artist">
            {primary_artist.name}
          </Descriptions.Item>
          <Descriptions.Item label="Album">{album.name}</Descriptions.Item>
          <Descriptions.Item label="Released">{release_date}</Descriptions.Item>
          <Descriptions.Item label="# Writers">
            {writer_artists.length}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  )
}
export default InfoTable
