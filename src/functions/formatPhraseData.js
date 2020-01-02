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
  {
    title: 'Details',
    dataIndex: 'operation',
    key: 'operation',
    render: () => {
      return (
        <span>
          <a onClick={console.log('thing')}>View Details</a>
        </span>
      )
    },
  },
]
