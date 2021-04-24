import axiosUrl from "../../axiosUrl";

export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

export const getCategoryRequest = () => ({type: GET_CATEGORY_REQUEST});
export const getCategorySuccess = value => ({type: GET_CATEGORY_SUCCESS, value});
export const getCategoryFailure = error => ({type: GET_CATEGORY_FAILURE, error});

export const getCategory = () => {
    return async dispatch => {
        try {
            dispatch(getCategoryRequest());
            const response = await axiosUrl.get('/categories');
            dispatch(getCategorySuccess(response.data));
        } catch (error) {
            dispatch(getCategoryFailure(error));
        }
    };
};