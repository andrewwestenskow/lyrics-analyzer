import React from 'react'
import { Table, Divider } from 'antd'
import { assignColor } from '../../functions/formatHot100'
import axios from 'axios'

const Hot100 = ({ data, loading, history }) => {
  const handleRedirect = async (title, artist) => {
    const {
      data: { id },
    } = await axios.get(`/api/song?title=${title}&artist=${artist}`)
    history.push(`/lyrics?id=${id}`)
  }

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      className: 'rank-column',
      render: rank => assignColor(rank),
    },
    {
      title: 'Image',
      dataIndex: 'cover',
      key: 'cover',
      className: 'landing-img-column',
      render: (imgUrl, record) => (
        <img
          onClick={() => handleRedirect(record.title, record.artist)}
          alt={imgUrl}
          className="landing-img"
          src={imgUrl}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      className: 'chart-info-column',
      ellipsis: true,
      render: (text, record) => (
        <p
          style={{ all: 'unset' }}
          onClick={() => handleRedirect(record.title, record.artist)}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
      className: 'chart-info-column',
      ellipsis: true,
      render: (text, record) => (
        <p
          style={{ all: 'unset' }}
          onClick={() => handleRedirect(record.title, record.artist)}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Peak/Duration',
      dataIndex: 'position',
      key: 'position',
      className: 'chart-info-column',
      render: position => (
        <div className="chart-stats-hold">
          <p>{`Peak: ${position.peakPosition}`}</p>
          <Divider style={{ backgroundColor: 'black', margin: 0 }} />
          <p>{`${position.weeksOnChart} weeks on chart`}</p>
        </div>
      ),
    },
  ]

  return (
    <div className="half-landing-hold">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 25 }}
        loading={loading}
        size="small"
        bordered={false}
        showHeader={false}
      />
    </div>
  )
}
export default Hot100
