import React, { useCallback, useState } from 'react'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@mui/material'
import { RouteItem } from '..'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'

const useStyles = makeStyles({
   nested: {},
   listItem: {
      height: '4rem'
   }
})

export type Props = {
   item: RouteItem
   iconStaticProps?: any
   ignoreActiveProps?: boolean
   handleRoute: (path?: string) => (e?: any) => void | Promise<void>
}

const ExpandableItemList = (props: Props) => {
   const { item, handleRoute } = props
   const [openMore, setOpenMore] = useState(false)
   const classes = useStyles()

   const handleClick = useCallback(
      () => {
         setOpenMore(state => !state)
      }, [])

   return <>
      <ListItem className={classes.listItem} button onClick={handleClick}>
         <ListItemIcon>
            {item.icon}
         </ListItemIcon>
         <ListItemText primary={item.title} />
         {openMore ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon />}
      </ListItem>
      <Collapse in={openMore} timeout='auto' unmountOnExit>
         <List component='div' disablePadding>
            {item.subpaths.map((subpath, i) => {
               return <ListItem key={`subpath-${i}`} button className={classes.nested} onClick={handleRoute(subpath.path)}>
                  <ListItemIcon>
                     <KeyboardArrowRightRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={subpath.title} />
               </ListItem>
            })}
         </List>
      </Collapse>
   </>
}

export default React.memo(ExpandableItemList)