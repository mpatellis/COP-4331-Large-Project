import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import JWT from 'jwt-client'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: 'auto',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    gridList: {
        width: 500,
        height: 'auto',
        transform: 'translateZ(0)',
        background: '#FFFFFF'
    },
    titleBar: {
        background: '#f09713'
    },
    icon: {
        color: 'white',
    },
}));
export default function Comments(props) {
    const classes = useStyles();
    const { loadComments, setLoadComments, selectedValue } = props;
    const [comments, setComments] = React.useState([])

    const [inital, setInital] = React.useState(0)


    if (loadComments == 0) {
        getComments()
        setLoadComments(1)
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


    return (
        <div className={classes.root}>
            <GridList cellHeight={"auto"} spacing={0} className={classes.gridList}>
                {comments.map(tile => (
                    <GridListTile key={tile.id} cols={2} rows={1}>
                        <Typography component="div">
                            <Box textAlign="justify" m={2} mt={6}>{tile.text}</Box>
                        </Typography>
                        <GridListTileBar
                            title={tile.username}
                            titlePosition="top"
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`} className={classes.icon} size={'small'}>
                                    {(tile.rating > 0) ? <StarIcon /> : <StarBorderIcon />}
                                    {(tile.rating > 1) ? <StarIcon /> : <StarBorderIcon />}
                                    {(tile.rating > 2) ? <StarIcon /> : <StarBorderIcon />}
                                    {(tile.rating > 3) ? <StarIcon /> : <StarBorderIcon />}
                                    {(tile.rating > 4) ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            }
                            actionPosition="right"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}