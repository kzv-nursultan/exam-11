import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core";
import {getOneItem} from "../../store/actions/ItemsActions";
import Grid from "@material-ui/core/Grid";
import OneItemCard from "../../components/OneItemCard/OneItemCard";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles({
    test: {
        textAlign:'center'
    },
    posts: {
        margin:'20px auto'
    },
    comments: {
        margin: '10px auto',
        textAlign: 'center',
    },
    addBtnBlock: {
        margin: '20px auto',
        textAlign: 'center'
    },
    link:{
        marginTop:'35px',
        fontSize:'small',
        display:'block',
        marginLeft:'auto'
    }
})

const OneGoodPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const item = useSelector(state=>state.goods.oneGood);
    const goods = useSelector(state=>state.goods);

    useEffect(()=>{
        dispatch(getOneItem(id));
    },[dispatch, id]);

    let showItem = "Item not Found";

    if(item._id) {
       showItem = (
           <OneItemCard
               title={item.title}
               description={item.description}
               image={item.image}
               author={item.author.display_name}
               price={item.price}
               phone={item.author.phone}
               token={item.author.token}
               id={id}
           />
       )
    }

    let errorList = "";
    let successList = "";

    if (goods.error !== null) {
        errorList = (
            <Alert severity="error">{goods.error.message}</Alert>
        )
    }

    if (goods.removeGood !==null) {
      successList = (
          <Alert severity="success">{goods.removeGood.message}</Alert>
      )
    }

    return (
        <Grid container direction='column' justify='center'>
            {errorList} {successList}

            <Grid container item xs={11} justify='center' className={classes.posts}>
                {showItem}
            </Grid>
        </Grid>
    );
}

export default OneGoodPage;