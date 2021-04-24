import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {usersReducer} from "./reducers/userReducer";
import {itemReducer} from "./reducers/itemReducer";
import {categoryReducer} from "./reducers/categoryReducer";

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('shopUser', serializedState);
    } catch (error) {
        console.log('Could not save to local storage');
    };
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('shopUser');
        if (serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    };
};

const rootReducer = combineReducers({
    goods: itemReducer,
    user : usersReducer,
    category: categoryReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(thunk));
const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(()=>{
    saveToLocalStorage({
        user: store.getState().user
    });
});

export default store;