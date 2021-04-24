import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {getAllItems, getByCategory} from "../../store/actions/ItemsActions";
import ItemCard from "../../components/ItemCard/ItemCard";
import FormSelect from "../../components/FormSelect/FormSelect";

const MainPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state=>state.goods.goods);
    const [category, setCategory] = useState({})

    useEffect(()=>{
        dispatch(getAllItems());
    },[dispatch]);

    let listOfPosts = 'no items found';

    if (items) {
        listOfPosts = (
            items.map(object=>
                (
                    <ItemCard
                        key={object._id}
                        price={object.price}
                        title={object.title}
                        image={object.image}
                        id={object._id}/>
                )
            )
        )
    };

    const changeHandler = (e) => {
        const {name, value} = e.target
        setCategory({
            [name]: value});

        dispatch(getByCategory(category));
    };

    return (
        <Grid container justify='center' direction='column'>
            <Grid container item xs={6} style={{margin:"5px auto"}}>
                <FormSelect
                handleChange={changeHandler}/>
            </Grid>
            {listOfPosts}
        </Grid>
    );
};

export default MainPage;