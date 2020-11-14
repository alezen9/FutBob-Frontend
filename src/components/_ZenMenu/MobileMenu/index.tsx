import React from 'react'
import { RouteItem } from '..'
import Navbar from './Navbar'

type Props = {
   items: RouteItem[]
   dropdown?: boolean
}

const MobileMenu = (props: Props) => {
   const { items, dropdown = true } = props
   return dropdown
      ? <Navbar items={items} />
      : <></>
}

export default React.memo(MobileMenu)
