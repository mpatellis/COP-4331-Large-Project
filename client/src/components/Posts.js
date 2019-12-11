import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'

import JWT from 'jwt-client'

import axios from 'axios'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'
import PostInfo from './PostInfo'
// import NewPost from './NewPost'
// import AppovePosts from './ApprovePosts'

const styles = theme => ({
  paper: {
    maxWidth: 1236,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: '40px 16px'
  }
})


function Content(props) {
  const { classes } = props

  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const [inital, setInital] = React.useState(0)
  const [posts, setPosts] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('loading');
  const [isAdmin, setIsAdmin] = React.useState(0)
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(0)

  const handleClickOpen = (value) => {
    setSelectedValue(value)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (inital == 0) {
    getPosts()
    setInital(1)
  }

  function getPosts() {
    const token = JWT.get()
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    axios
      .get('/post')
      .then(response => {
        setPosts(response.data)
        console.log(response)
      })
      .catch(error => {
      })
    // axios
    //   .get('/admin')
    //   .then(response => {
    //     setIsAdmin(response.data.isAdmin)
    //   })
    //   .catch(error => {
    //   })

    // axios
    //   .get('/superAdmin')
    //   .then(response => {
    //     setIsSuperAdmin(response.data.isAdmin)
    //   })
    //   .catch(error => {
    //   })
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClickPop = post => {
    setAnchorEl(post.currentTarget)
  }

  const handleClosePop = () => {
    setAnchorEl(null)
  }

  const openPop = Boolean(anchorEl);
  const idPop = open ? 'simple-popover' : undefined;

  function Posts(props) {
    const classes = useStyles();


    if (posts.length != 0) {
      var postFeed = [posts[10]] || []
      console.log(postFeed[0].file = postFeed[0].url)
      return (
        <Grid container spacing={3}>
          {postFeed.map((item, index) =>
            <Grid key={item.body._id} item md={4} onClick={(e) => { console.log(item.body._id); handleClickOpen(item.body._id) }}>
              <Card color="primary" className={classes.card}>
                <CardContent>
                  <img src="https://fix-this.s3.amazonaws.com/5df148f2ef40f36d529d3e12.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIFAXIQASCBJHSHSQ%2F20191211%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191211T195325Z&X-Amz-Expires=300&X-Amz-Signature=ada3c188cf375d98770233e17516bb1ba06adc147fc605ba18f441e7f0549c19&X-Amz-SignedHeaders=host" alt="pic"> </img>
                  <Typography variant="h5" component="h2">
                    {item.body.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {item.category}<br />
                  </Typography>
                  <Typography component="p" >
                    {(item.body.text.length <= 100) ? item.body.text : item.body.text.substring(0, 100) + "..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>)
          }
          <PostInfo selectedValue={selectedValue} open={false} onClose={handleClose} />
        </Grid >
      )
    }
    return (<Typography color="textSecondary" align="center">
      No posts found
  </Typography>)

  }

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            </Grid>
            <Grid item xs>
              Post Feed
            </Grid>
            <Grid item >
              {/* {(isSuperAdmin == 1) && <AppovePosts getPosts={getPosts} />} */}
            </Grid>
            <Grid item >
              {/* {(isAdmin == 1) && <NewPost />} */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.addUser}
                onClick={getPosts}
              >
                Refresh
              </Button>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Posts />
      </div>
    </Paper>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Content)
