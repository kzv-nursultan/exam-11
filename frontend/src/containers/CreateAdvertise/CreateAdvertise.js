import React, {useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import SendSharpIcon from '@material-ui/icons/SendSharp';
import FormInput from "../../components/FormInput/FormInput";
import FormSelect from "../../components/FormSelect/FormSelect";
import {postItem, setInitial} from "../../store/actions/ItemsActions";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles({
    itemBlock: {
        maxWidth: 600,
        margin: '10px auto'
    },
    formBlock: {
        width: '100%',
        textAlign:'center',
    },
    ordinaryInput: {
        display: 'none'
    },
    fileInput: {
        margin: '20px 0',
        cursor: 'pointer',
    }
})

const CreateAdvertise = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputClick = useRef();
    const history = useHistory();
    const loggedUser = useSelector(state=>state.user.loginUser);
    const error = useSelector(state => state.goods.error);
    const success = useSelector(state=> state.goods.addOne)

    if(!loggedUser.user) {
        history.push("/login");
    }

    const [item, setItem] = useState({
        category:'',
        title:'',
        description:'',
        image:'',
        author: loggedUser.user._id,
        price:'',
    });


    const changeHandler = (e) => {
        const {name, value} = e.target;

        setItem(prevState => ({
            ...prevState,
            [name]:value
        }));
    };

    const currentClick = () => {
        inputClick.current.click();
    };

    const fileChangeHandler = (event) => {
        if (event.target.files[0].name){
            const name = event.target.name;
            const file = event.target.files[0];
            setItem(prevState => ({
                ...prevState,
                [name]:file
            }));
        } else {
            setItem(prevState => ({
                ...prevState,
                image:''
            }));
        }
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(item).forEach(key=>(
                formData.append(key, item[key])
            ));

            await dispatch(postItem(formData, loggedUser.user.token));

            if (error === null) {
                setTimeout(()=>{
                    //dispatch(setInitial());
                    history.push('/');
                },2000)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Grid container direction='column'>
            {error !== null && (
                <Alert severity="error">{error.message}</Alert>
            )}

            {success._id && (
                <Alert severity="success">Success!</Alert>
            )}

            <Grid container item className={classes.itemBlock}>
                <form
                    className={classes.formBlock}
                    onSubmit={formSubmitHandler}>
                    <Typography variant='h5' component='h3'>
                        Add new Post
                    </Typography>

                    <FormSelect
                    value = {item.category.name}
                    handleChange={changeHandler}/>

                    <FormInput
                        label={'Title'}
                        onChange={changeHandler}
                        value={item.title}
                        name={'title'}
                        required={true}/>

                    <TextField
                        name='description'
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue={item.description}
                        variant="outlined"
                        onChange={changeHandler}
                        required={true}
                        fullWidth
                    />
                    <input
                        className={classes.ordinaryInput}
                        type='file'
                        name='image'
                        required
                        ref={inputClick}
                        onChange={fileChangeHandler}/>
                    <TextField
                        disabled
                        name='image'
                        required={true}
                        className={classes.fileInput}
                        value={item.image.name ? item.image.name : 'image'}
                        InputLabelProps={{ shrink: true }}
                        fullWidth variant='outlined'
                        label='Click here to choose file'
                        onClick={currentClick}/>

                    <FormInput
                        label={"Price"}
                        onChange={changeHandler}
                        required={true}
                        value={item.price}
                        name={'price'}/>
                    <Button
                        type='submit'
                        endIcon={<SendSharpIcon/>}
                        variant='outlined'
                        color='secondary'
                    >
                        POST
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default CreateAdvertise;