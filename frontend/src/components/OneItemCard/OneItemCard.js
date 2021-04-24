import React from 'react';
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {Button, CardMedia, makeStyles} from "@material-ui/core";
import {removeItem, setInitial} from "../../store/actions/ItemsActions";

const useStyles = makeStyles({
    root: {
        border: '1px solid brown',
    },
    imageBlock: {
        border:'1px solid black',
        margin: '5px',
        marginRight: '15px',
        width: 320,
    },
    media: {
        height: 0,
        paddingTop: '100%',
        margin: '5px',
    },
    soldBtn: {
        margin: 10,
    }
})

const OnePostCard = ({title, description, image, author, price, phone, token, id }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = useSelector(state => state.user.loginUser.user);

    const url = 'http://localhost:8000' + image;
    const authorsToken = token;

    const soldBtnHandler = () => {
        dispatch(removeItem(id, loggedUser.token));
        setTimeout(()=>{
            dispatch(setInitial());
            history.push('/')
        },1000)
    };

    return (
        <Grid container item className={classes.root} alignItems='center'>
            <Grid item className={classes.imageBlock}>
                <CardMedia
                    className={classes.media}
                    title='Post image'
                    image={ url }
                />
            </Grid>
            <Grid item>
                <Typography variant='h4'>
                    Title: <strong>{title}</strong>
                </Typography>
                <Typography variant='h4'>
                    Description: <strong>{description}</strong>
                </Typography>
                <Typography variant='h4'>
                    Price: <strong>{price}</strong>
                </Typography>
                <Typography variant='h4'>
                    Posted by <strong>{author}</strong>
                </Typography>
                <Typography variant='h4'>
                    Phone: {phone}
                </Typography>
                {loggedUser && (
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={authorsToken !== loggedUser.token}
                        onClick={soldBtnHandler}
                        className={classes.soldBtn}>
                        Sold
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default OnePostCard;