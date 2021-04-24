import {
    GET_ALL_ITEMS_FAILURE,
    GET_ALL_ITEMS_REQUEST,
    GET_ALL_ITEMS_SUCCESS, GET_BY_CATEGORY,
    GET_ONE_ITEM_FAILURE,
    GET_ONE_ITEM_REQUEST,
    GET_ONE_ITEM_SUCCESS,
    POST_ITEM_FAILURE,
    POST_ITEM_REQUEST,
    POST_ITEM_SUCCESS,
    REMOVE_ITEM_FAILURE,
    REMOVE_ITEM_REQUEST,
    REMOVE_ITEM_SUCCESS,
    SET_TO_INITIAL
} from "../actions/ItemsActions";

const initialState = {
    loading: false,
    goods: [],
    oneGood:[],
    addOne: {},
    error:null,
    removeGood:null,
    categoryItem:[]
};

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ITEMS_REQUEST:
            return {...state, loading: true};
        case GET_ALL_ITEMS_SUCCESS:
            return {...state, goods: action.value, loading: false};
        case GET_ALL_ITEMS_FAILURE:
            return {...state, error: action.error, loading: false};
        case GET_ONE_ITEM_REQUEST:
            return {...state, loading: true};
        case GET_ONE_ITEM_SUCCESS:
            return {...state, oneGood: action.value, loading:false};
        case GET_ONE_ITEM_FAILURE:
            return {...state, error: action.error, loading: false};
        case POST_ITEM_REQUEST:
            return {...state, loading: true};
        case POST_ITEM_SUCCESS:
            return {...state, addOne:action.value, loading: false};
        case POST_ITEM_FAILURE:
            return {...state, error: action.error, loading: false};
        case REMOVE_ITEM_REQUEST:
            return {...state, loading: true};
        case REMOVE_ITEM_SUCCESS:
            return {...state, removeGood: action.value, loading: false};
        case REMOVE_ITEM_FAILURE:
            return {...state, error: action.error, loading: false};
        case GET_BY_CATEGORY :
            return {...state, categoryItem: action.value};
        case SET_TO_INITIAL:
            return {...initialState};
        default:
            return state;
    }
};