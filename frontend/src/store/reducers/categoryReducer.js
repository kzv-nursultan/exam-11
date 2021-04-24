import {GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS} from "../actions/CategoryActions";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {...state, loading: true};
        case GET_CATEGORY_SUCCESS:
            return {...state, data: action.value, loading: false};
        case GET_CATEGORY_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};