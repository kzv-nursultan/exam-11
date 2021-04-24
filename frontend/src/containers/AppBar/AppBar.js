import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ToolBar from "../../components/Toolbar/Toolbar";
import LoggedInUser from "../../components/LoggedUser/LoggedUser";
import {setInitial} from "../../store/actions/ItemsActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:'20px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor:'pointer'
    },
    navs: {
        display:'flex',
        maxWidth: 140,
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems:'center',
    },
    links: {
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase'
    }
}));

const ButtonAppBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.loginUser.user);

    const clickHandler = () => {
        dispatch(setInitial());
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <NavLink to='/' className={classes.links} onClick={clickHandler}> <strong> SHOP API </strong></NavLink>
                    </Typography>
                    <Grid item className={classes.navs}>
                        {user ? (<LoggedInUser username={user.username}/>) : (<ToolBar/>)}
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;