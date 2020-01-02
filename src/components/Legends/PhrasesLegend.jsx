import React from 'react'
import { Card, Table } from 'antd'
import { columns } from '../../functions/formatPhraseData'

const PhrasesLegend = ({ stats, colorsArr, loading }) => {
  console.log(stats)
  return (
    <Card title="Phrase Data" loading={loading}>
      <div className="half-chart-hold">
        <Table
          bordered={true}
          columns={columns}
          dataSource={stats}
          loading={loading}
          size="small"
          pagination={false}
        />
      </div>
    </Card>
  )
}
export default PhrasesLegend
