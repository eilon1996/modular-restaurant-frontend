import {createStore, combineReducers, applyMiddleware } from 'redux';

import { MyContent } from './myContent';
import { Content } from './content';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    console.log("configStore: Content", Content)
    console.log("configStore: Dishes", Dishes)
    const store = createStore(
        combineReducers({
            myContent: MyContent,
            content: Content,
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}