import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Divider } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { MapContext } from '../MapContext'
import {getZoneInfo} from '../ZoneRoutes'
import Test from './test3'

const styles = theme => ({
  paper: {
    maxWidth: 1236,
    height: '100%',
    margin: 'auto',
    flexWrap: 'wrap',
    overflow: 'scroll'
  },
  searchBar: {
    height: '35px',
    padding: '2px 2px 2px 5px',
    marginBottom: '5px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '0px 0px',
    // overflow: 'scroll'
  },
});

function Content(props) {
  const { classes } = props;
  const [zones, setZones, cords, setCords, parentZone, setParentZone] = React.useContext(MapContext)
  const [editable, setEditable] = React.useState(false)
  const [renderInfo, setRenderInfo] = React.useState(true)
  var tmpZone = zones.slice(0)
    function rerenderInfo() {
        setRenderInfo(false)
        setRenderInfo(true)
    }


  React.useEffect(() => {
    const intervalId = setInterval(() => {  
      if (JSON.stringify(tmpZone)!=JSON.stringify(zones)) {
        rerenderInfo()
        tmpZone = zones.slice(0)
      }
        
    }, 500)
  
    return () => clearInterval(intervalId);
  
  })

  return (
    <Paper className={classes.paper}>
      <AppBar style={{background: `${(parentZone[0] != null)? parentZone[0].color.replace( /\)/, ", .4)") : ''}`}} className={classes.searchBar} position="static" color="default" elevation={0}>
          <Grid container style={{height: '100%'}} spacing={0} alignItems="center">
            <Grid item xs>
              {(parentZone[0] != null) &&
                <IconButton 
                size="small"
                aria-label="back"
                onClick={async e=>{
                    if (parentZone[0] != null) {
                      var id = parentZone[0].parent_zone_id
                      console.log(parentZone)
                      var tmp = await getZoneInfo({zone_id: id})
                      console.log(tmp)
                      parentZone[0] = tmp[0]
                      console.log(parentZone)
                    }
                }}
                >
                <BackIcon className={classes.block} color="inherit" />
                </IconButton>
              }
            </Grid>
            <Grid item>
              <Typography>
                {(parentZone[0] == null) && 'Master Zones'}
              {(parentZone[0] != null) && parentZone[0].name}
              </Typography>
            </Grid>
            
            <Grid item xs>
            </Grid>
            <Grid item>             
            </Grid>
          </Grid>

      </AppBar>
        {renderInfo &&  zones.length != 0 &&
        <Test zones={zones} num={true}></Test>
        }
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);