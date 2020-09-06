import React, { ReactElement } from 'react'
import { TableCell } from '@material-ui/core'

type Props = {
  name?: string
  align?: 'left'|'center'|'right'
  style?: any
  headerStyles?: any
  component?: ReactElement
  [x: string]: any
}

const CondexoTableCell: React.FC<Props> = props => {
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
