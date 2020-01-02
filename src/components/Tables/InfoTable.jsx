import React from 'react'
import { Descriptions, Card } from 'antd'
import { smallTableHold } from '../../constants/styles'
import useMediaQuery from '../../hooks/useMediaQuery'
import { bigBreak } from '../../constants/breakPoints'

const InfoTable = ({ song, loading, stats }) => {
  const { title, primary_artist, album, release_date, writer_artists } = song

  const isDesktop = useMediaQuery(bigBreak)

  return loading ? (
    <Card title="Loading Stats" loading={loading}></Card>
  ) : (
    <Card
      className="small-card-container"
      bodyStyle={smallTableHold(isDesktop)}
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
          {stats.phrases[0].phrase}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
export default InfoTable
