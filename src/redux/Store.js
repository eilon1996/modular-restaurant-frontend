import {createStore, combineReducers, applyMiddleware } from 'redux';

import { MyContent } from './myContent';
import { Credentials } from './credentials';
import { Dishes } from './dishes';
import { ThePlace } from './thePlace';
import { Casing } from './casing';
import { Staff } from './staff';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const Store = () => {
    console.log("configStore: Dishes", Dishes)
    const store = createStore(
        combineReducers({
            myContent: MyContent,
            casing: Casing,
            credentials:Credentials,
            staff: Staff,
            thePlace: ThePlace,
            dishes: Dishes,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}