import React, {useEffect} from 'react';
import {FormControl} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../store/actions/CategoryActions";

const useStyles = makeStyles({
    formControl: {
        width: '100%',
        margin: '10px 0'
    },
    select: {
        padding: '10px 5px',
        margin: '10px 0'
    }
})

const FormSelect = ({handleChange}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryList = useSelector(state=>state.category.data);

    useEffect(()=>{
        dispatch(getCategory());
    },[dispatch]);

    let list = (
        <option> categories not found </option>
    );

    if (categoryList.length>0){
        list = (
            categoryList.map(object=>(
                <option
                    key={object._id}
                    value={object._id}>
                    {object.name}
                </option>
            ))
        );
    }

    return (
        <FormControl className={classes.formControl}>
            <label htmlFor="categories">Choose a category:</label>
                <select name="category"
                        id="categories"
                        onChange={handleChange}
                        className={classes.select}
                        required>
                    <option></option>
                    {list}
                </select>
        </FormControl>
    );
};

export default FormSelect;