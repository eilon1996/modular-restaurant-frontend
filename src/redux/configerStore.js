import {createStore, combineReducers, applyMiddleware } from 'redux';

import { MyContent } from './myContent';
import { Content } from './content';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Page } from './page';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            myContent: MyContent,
            content: Content,
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            page:Page,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}