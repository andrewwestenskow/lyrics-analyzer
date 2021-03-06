import React from 'react'
import { Descriptions, Card } from 'antd'
import { halfTableHold } from '../../constants/styles'

const InfoTable = ({ song, loading, stats, isDesktop }) => {
  const { title, primary_artist, album, release_date, writer_artists } = song

  return loading ? (
    <Card
      bodyStyle={halfTableHold(isDesktop)}
      title="Loading Stats"
      loading={loading}
    ></Card>
  ) : (
    <Card
      title="Song stats"
      className="card-container"
      bodyStyle={halfTableHold(isDesktop)}
    >
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
        <Descriptions.Item label="Unique Words">
          {stats.totalUnique[0].value}
        </Descriptions.Item>
        <Descriptions.Item label="Predicted Hook">
          {stats.phrases[0].phrase &&
            `${stats.phrases[0].phrase
              .charAt(0)
              .toUpperCase()}${stats.phrases[0].phrase.slice(1)}`}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
export default InfoTable
