import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Add from '@material-ui/icons/Add';
import JWT from 'jwt-client'
import axios from 'axios'
import { from } from 'rxjs';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '95%',
        // backgroundColor: theme.palette.common.white,
        // boxShadow: `${fade('#f09713', 0.25)} 0 0 0 0.2rem`,
        // borderColor: '#f09713',
        // borderRadius: 4,
        // border: '1px solid #f09713',
    },
    gridList: {
        transform: 'translateZ(0)',
        background: '#FFFFFF'
    },
    commentBar: {
        background: '#f09713'
    },
    titleBar: {
        background: 'rgba(0,100,250,1) 70%'
    },
    icon: {
        color: 'white',
    },
}));

export default function AdvancedGridList(props) {
    const classes = useStyles();
    const { loadComments, setLoadComments, selectedValue } = props;
    const [text, setText] = React.useState('');
    const [rating, setRating] = React.useState(0)

    const handleChange = event => {
        setText(event.target.value);
    };

    function addComment() {
        const token = JWT.get()
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        var comment = { rating: rating, text: text, event_id: selectedValue }
        axios
            .post(`/comments/`, comment)
            .then(response => {
                setLoadComments(0)
                setText('')
                setRating(0)
            })
            .catch(error => {
            })
    }


    return (
        <form className={classes.commentBar} noValidate autoComplete="off" >
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Grid container  >
                    <Grid item xs={11}>
                        <TextField
                            id="outlined-textarea"
                            label=""
                            placeholder="Comment..."
                            multiline
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            
                            value={text}
                            onChange={handleChange}
                        />
                        </Grid>
                        <Grid item xs={1}>
                        <IconButton size='small' aria-label={`submit`} className={classes.icon} onClick={(e) => { addComment() }}>
                            <Add fontSize={'large'} />
                        </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}