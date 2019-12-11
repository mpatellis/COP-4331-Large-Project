import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import logo from './imgs/FixThisLogoSimple.png'; 
import {AppContext } from '../AppContext' 


const categories = [
  {
    id: 'Reports',
    children: [
      { id: 'Featured', icon: <StarBorderIcon />, active: true },
      { id: 'New', icon: <NewReleasesIcon /> },
      { id: 'Search', icon: <SearchIcon />, pageName: "home"},
      { id: 'Map', icon: <SearchIcon /> , pageName: "map" },
    ],
  }
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: '#f09713', //orange
    },
  },
  itemCategory: {
    backgroundColor: '#262525', //black
    boxShadow: '0 -1px 0 #f09713 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
const [page, setPage] = React.useContext(AppContext)
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.itemCategory)}>
          <img className={classes.img} alt="FixThis" src={logo} width="200" height="65"/>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, pageName  }) => (
             <ListItem
               key={childId}
               button
               className={clsx(classes.item, active && classes.itemActiveItem)}
               onClick={ e => {setPage(pageName)}}
             >
               <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
               <ListItemText
                 classes={{
                   primary: classes.itemPrimary
                 }}
               >
                 {childId}
               </ListItemText>
             </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);