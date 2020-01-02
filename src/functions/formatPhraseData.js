import React from 'react'
import { Table } from 'antd'

export const columns = [
  {
    title: 'Phrase',
    dataIndex: 'phrase',
    key: 'phrase',
  },
  {
    title: 'Appearances',
    dataIndex: 'appearances',
    key: 'appearances',
  },
  {
    title: 'Variations',
    dataIndex: 'variations',
    key: 'variations',
  },
]

export const expandedRowRender = data => {
  const columns = [
    { title: 'Variation', dataIndex: 'variation', key: 'variation' },
    { title: 'Appearances', dataIndex: 'variations', key: 'variations' },
  ]

  return <Table columns={columns} data={data} pagination={false} />
}
