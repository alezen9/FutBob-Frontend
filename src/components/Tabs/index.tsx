import React, { useState, ReactChild, ReactNode, ReactChildren } from 'react'
import PropTypes from 'prop-types'
// MUI
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab, useMediaQuery } from '@material-ui/core'
// components
import SingleTab from './SingleTab'
// utils
import { compact, get } from 'lodash'

type Props = {
  children: React.FC<TabProps>[],
  safeGuard?: (val: number) => boolean
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'transparent'
  },
  appBar: {
    boxShadow: 'unset',
    backgroundColor: theme.type === 'light'
      ? 'rgba(0,0,0,.05)'
      : 'rgba(255,255,255,.1)',
    padding: '.2em'
  },
  tabs: {
    background: 'transparent'
  },
  tab: {
    color: theme.type === 'light'
      ? '#333'
      : '#fafafa',
    fontWeight: 18,
    textTransform: 'none'
  },
  tabSelected: {
    zIndex: 1,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  indicatorClass: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: theme.type === 'light'
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(255, 255, 255, 0.3)',
    boxShadow: theme.type === 'light'
      ? '0 3px 10px rgba(0,0,0,.1)'
      : 'unset',
    bottom: 0
  }
}))

const tabProps: any = (index: number) => {
  const { tab, tabSelected } = useStyles()
  return {
    id: `tabPanel-${index}`,
    'aria-controls': `tabPanel-${index}`,
    classes: {
      root: tab,
      selected: tabSelected
    }
  }
}

const FutBobTabs: React.FC<Props> = props => {
  const { children, safeGuard } = props
  const { wrapper, appBar, tabs, indicatorClass } = useStyles()
  const [value, setValue] = useState(0)
  const isSmallScreen = useMediaQuery('(max-width: 850px)')

  const handleChange = (e, newValue) => {
    const shouldChange = safeGuard
      ? safeGuard(newValue)
      : true
    if (shouldChange) setValue(newValue)
  }

  return (
    <div className={wrapper}>
      <AppBar className={appBar} position='static'>
        <Tabs
          variant={isSmallScreen ? 'fullWidth' : 'fullWidth'}
          value={value}
          onChange={handleChange}
          aria-label='Tab Panel'
          indicatorColor='primary'
          classes={{ root: tabs, indicator: indicatorClass }}
        >
          {compact(children).map((child, i) => {
            return <Tab
              disableRipple
              key={`tab-${i}`}
              label={get(child, 'props.title', '-')}
              {...tabProps(i)}
            />
          })
          }
        </Tabs>
      </AppBar>
      {compact(children).map((child, i) =>
        <SingleTab
          key={`tabPanel-${i}`}
          value={value}
          index={i}
          title={get(child, 'props.title', '-')}
          component={get(child, 'props.component', <></>)}
          outercomponent={get(child, 'props.outercomponent', <></>)}
        />)}
    </div>
  )
}

export default FutBobTabs

type TabProps = {
  title: string,
  component?: ReactNode,
  outercomponent?: ReactNode
}

export const FutBobTab: React.FC<TabProps> = props => <div {...props} />
