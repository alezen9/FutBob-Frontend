import React from 'react'
import ContentLoader from 'react-content-loader'

const Block = props => (
  <ContentLoader
    speed={2}
    style={{ height: '100%', width: '100%' }}
    {...props}
  >
    <rect x='0' y='0' width='100%' height='100%' />
  </ContentLoader>
)

export default Block
