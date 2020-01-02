import React from 'react'
import { Card, Table } from 'antd'
import { columns } from '../../functions/formatPhraseData'
import { halfTableHold } from '../../constants/styles'

const PhrasesLegend = ({ stats, colorsArr, loading, isDesktop }) => {
  console.log(stats)
  return (
    <Card
      bodyStyle={halfTableHold(isDesktop)}
      className="card-container"
      title={loading && 'Phrase Data'}
      loading={loading}
    >
      <Table
        bordered={true}
        columns={columns}
        dataSource={stats}
        loading={loading}
        size="default"
        pagination={false}
      />
    </Card>
  )
}
export default PhrasesLegend
