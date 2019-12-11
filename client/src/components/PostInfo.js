import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { List, ListItem, ListItemText } from '@material-ui/core'
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/blue'

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
        getComments()
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
            .get(`/comments/${selectedValue}`)
            .then(response => {
                setComments(response.data)
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
                <DialogTitle id="dialog-title">{post.body.title}</DialogTitle>
                <List>
                    <ListItem  >
                        {/* <ListItemText primary={post.category} /> */}
                    </ListItem>
                    <ListItem  >
                        <ListItemText primary={post.body.text} />
                    </ListItem>
                </List>
                <Comments loadComments={loadComments} setLoadComments={setLoadComments} selectedValue={selectedValue} />
                <NewComment loadComments={loadComments} setLoadComments={setLoadComments} selectedValue={selectedValue} />
            </Dialog >
        )
    }

    return null
}

export default PostInfo