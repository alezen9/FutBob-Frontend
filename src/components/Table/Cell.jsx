import React from 'react'
import { TableCell } from '@material-ui/core'

const CondexoTableCell = props => {
  const { name = '', align = 'left', style = {}, headerStyles = {}, component } = props
  return (
    <TableCell
      align={align}
      style={{ ...headerStyles, ...style }}>
      {component || name}
    </TableCell>
  )
}

export default React.memo(CondexoTableCell)
