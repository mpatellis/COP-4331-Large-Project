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
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Divider } from '@material-ui/core'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { MapContext } from '../MapContext'
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
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by location, address, or zone ID"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser}>
                Search
              </Button>              
            </Grid>
          </Grid>
        </Toolbar>
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