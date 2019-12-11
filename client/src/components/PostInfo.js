import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { List, ListItem, ListItemText } from '@material-ui/core'
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs'
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blue'
import UpVoteIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import Comments from './Comments'
import NewComment from './NewComment'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: color,
    },
    gridList: {
        width: 500,
    },
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
}));

const PostInfo = (props) => {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const [post, setPost] = React.useState([])
    const [comments, setComments] = React.useState([])

    const [inital, setInital] = React.useState(0)
    const [loadComments, setLoadComments] = React.useState(0)
    console.log("Here")

    if (inital == 0) {
        getPost()
        setInital(1)
    }

    function getPost() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .get(`/post/id/${selectedValue}`)
            .then(response => {
                setPost(response.data)
                console.log(selectedValue)
                console.log(response.data)
            })
            .catch(error => {
            })
    }

    function getComments() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        axios
            .post(`/vote/${selectedValue}/${selectedValue}`)
            .then(response => {
                setComments(response.data)
                getPost()
            })
            .catch(error => {
            })
    }

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };
    if (post.body) {
        return (
            <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
                
                <AppBar id="dialog-title" position="sticky">
                    <Grid container  >
                        <Grid item xs={12}>
                            <Grid container  >
                                <Grid item xs={10}>
                                <div style={{padding: '3px'}}>
                                <Typography variant="h4" padding="3px"> {post.body.title}</Typography>
                                </div>
                                </Grid>
                                
                                <Grid item xs={2}>
                                    <div width="100%" justifyContent="left">
                                    {post.body.up_votes}
                                        <IconButton 
                                            size="small"
                                            aria-label="back"
                                            onClick={ e=>{getComments()}
                                            }
                                            >
                                            <UpVoteIcon color="inherit" />
                                            
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </AppBar>
                <div style={{width: '500px', padding: '10px'}} align="center">
                    <div style={{width: '100%', overflow: "hidden"}}>
                        <img src={post.url} alt={post.body._id} width="480px" ></img>
                    </div>
                </div>
                <List>
                    <ListItem  >
                        <ListItemText primary={post.body.text} />
                    </ListItem>
                </List>
                {/* <Comments loadComments={loadComments} setLoadComments={setLoadComments} selectedValue={selectedValue} /> */}
                {/* <NewComment loadComments={loadComments} setLoadComments={setLoadComments} selectedValue={selectedValue} /> */}
            </Dialog >
        )
    }

    return null
}

export default PostInfo