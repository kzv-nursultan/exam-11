import axiosUrl from "../../axiosUrl";

export const GET_ALL_ITEMS_REQUEST = 'GET_ALL_ITEMS_REQUEST';
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_ITEMS_FAILURE = 'GET_ALL_ITEMS_FAILURE';

export const POST_ITEM_REQUEST = 'POST_ITEM_REQUEST';
export const POST_ITEM_SUCCESS = 'POST_ITEM_SUCCESS';
export const POST_ITEM_FAILURE = 'POST_ITEM_FAILURE';

export const GET_ONE_ITEM_REQUEST = 'GET_ONE_ITEM_REQUEST';
export const GET_ONE_ITEM_SUCCESS = 'GET_ONE_ITEM_SUCCESS';
export const GET_ONE_ITEM_FAILURE = 'GET_ONE_ITEM_FAILURE';

export const REMOVE_ITEM_REQUEST = 'REMOVE_ITEM_REQUEST';
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS';
export const REMOVE_ITEM_FAILURE = 'REMOVE_ITEM_FAILURE';

export const GET_BY_CATEGORY = 'GET_BY_CATEGORY';

export const SET_TO_INITIAL = 'SET_TO_INITIAL';

export const getAllItemsRequest = () => ({type: GET_ALL_ITEMS_REQUEST});
export const getAllItemsSuccess = value => ({type: GET_ALL_ITEMS_SUCCESS, value});
export const getAllItemsFailure = error => ({type: GET_ALL_ITEMS_FAILURE, error});

export const postItemRequest = () => ({type: POST_ITEM_REQUEST});
export const postItemSuccess = value => ({type: POST_ITEM_SUCCESS, value});
export const postItemFailure = error => ({type: POST_ITEM_FAILURE, error});

export const getOneItemRequest = () => ({type:GET_ONE_ITEM_REQUEST});
export const getOneItemSuccess = value => ({type:GET_ONE_ITEM_SUCCESS, value});
export const getOneItemFailure = error => ({type:GET_ONE_ITEM_FAILURE, error});

export const removeItemRequest = () => ({type:REMOVE_ITEM_REQUEST});
export const removeItemSuccess = value => ({type: REMOVE_ITEM_SUCCESS, value});
export const removeItemFailure = error => ({type: REMOVE_ITEM_FAILURE, error});
export const getCategory = value => ({type: GET_BY_CATEGORY, value});



export const getAllItems = () => {
    return async dispatch => {
        try {
            dispatch(getAllItemsRequest());
            const response = await axiosUrl.get('/goods');
            dispatch(getAllItemsSuccess(response.data));
        } catch (error) {
            dispatch(getAllItemsFailure(error));
        };
    };
};

export const postItem = (data, token) => {
    return async dispatch => {
        try {
            dispatch(postItemRequest());
            const response = await axiosUrl.post('/goods', data, {headers:{
                    'Authorization':token
                }});
            dispatch(postItemSuccess(response.data));
        } catch (e) {
            dispatch(postItemFailure(e));
        };
    };
};

export const getOneItem = (id) => {
    return async dispatch => {
        try {
            dispatch(getOneItemRequest());
            const response = await axiosUrl.get('/goods/'+id);
            dispatch(getOneItemSuccess(response.data));
        } catch (error) {
            dispatch(getOneItemFailure(error));
        };
    };
};

export const removeItem = (id, token) => {
    return async dispatch => {
        try {
            dispatch(removeItemRequest());
            const response = await axiosUrl.delete('/goods/'+id, {headers:{'Authorization':token}});
            dispatch(removeItemSuccess(response.data));
        } catch (error) {
            dispatch(removeItemFailure(error));
        }
    };
};

export const getByCategory = (id) => {
    return async dispatch => {
        try {
           const response = await axiosUrl.get('/goods/' + id);
           dispatch(getCategory(response.data));
        } catch (e) {
            console.error(e);
        }
    }
};

export const setInitial = () => {
    return async dispatch => {
        try {
            dispatch({type: SET_TO_INITIAL});
        } catch (e){
            console.error(e)
        }
    }
};