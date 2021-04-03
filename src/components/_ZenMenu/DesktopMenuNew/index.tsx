import React, { useCallback } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { logoutFn, RouteItem } from '..';
import ThemeModeSwitch from '@_components/ThemeModeSwitch';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useConfigStore } from '@_zustand/config';
import { ConfigStore } from '@_zustand/config/helpers';
import { ZenPalette } from '@_MUITheme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
      },
      appBar: {
         zIndex: theme.zIndex.drawer + 1,
         borderRadius: 0,
         backgroundColor: ZenPalette.backgroundColorStandOut,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
      },
      appBarShift: {
         marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
         transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      menuButton: {
         marginRight: 36,
      },
      hide: {
         display: 'none',
      },
      drawer: {
         width: drawerWidth,
         flexShrink: 0,
         whiteSpace: 'nowrap',
      },
      drawerOpen: {
         width: drawerWidth,
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
         }),
      },
      drawerClose: {
         transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         overflowX: 'hidden',
         width: theme.spacing(7) + 1,
         [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
         },
      },
      toolbar: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'flex-end',
         padding: theme.spacing(0, 1),
         // necessary for content to be below app bar
         ...theme.mixins.toolbar,
      },
      content: {
         flexGrow: 1,
         padding: theme.spacing(3),
      },
   }),
)

type Props = {
   items: RouteItem[]
   logout: logoutFn
}

const stateSelector = (state: ConfigStore) => ({
   menuOpen: state.menuOpen,
   toggleMenu: state.toggleMenu
})

const DesktopMenuNew: React.FC<Props> = props => {
   const { items, logout } = props
   const { menuOpen, toggleMenu } = useConfigStore(stateSelector)
   const classes = useStyles();
   const theme = useTheme();
   const router = useRouter()

   const handleRoute = useCallback((path: string) => () => {
      router.push(path)
   }, [])

   console.log(menuOpen)

   return (
      <>
         {/* <CssBaseline /> */}
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: menuOpen,
            })}
         >
            <Toolbar>
               <IconButton
                  color="primary"
                  aria-label="menuOpen drawer"
                  onClick={toggleMenu}
                  edge="start"
                  className={clsx(classes.menuButton, {
                     [classes.hide]: menuOpen,
                  })}
               >
                  <MenuIcon />
               </IconButton>
               <Grid container justify='flex-end' alignItems='center'>
                  <Grid item>
                     <ThemeModeSwitch />
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>
         <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
               [classes.drawerOpen]: menuOpen,
               [classes.drawerClose]: !menuOpen,
            })}
            classes={{
               paper: clsx({
                  [classes.drawerOpen]: menuOpen,
                  [classes.drawerClose]: !menuOpen,
               }),
            }}
         >
            <div className={classes.toolbar}>
               <IconButton color='primary' onClick={toggleMenu}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
               </IconButton>
            </div>
            <Divider />
            <List>
               {items.map((item, idx) => (
                  <ListItem button key={idx} onClick={handleRoute(item.path)}>
                     <ListItemIcon>{item.icon}</ListItemIcon>
                     <ListItemText primary={item.title} />
                  </ListItem>
               ))}
            </List>
         </Drawer>
      </>
   );
}

export default DesktopMenuNew
