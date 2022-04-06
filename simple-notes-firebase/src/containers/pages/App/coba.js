import React from 'react';
import { Fragment } from 'react-is';
import redux from 'redux';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
const Coba = () => {
    
    const initialState = {
        popup: false,
        isLogin: false
    }

    const reduce = (state = initialState, action) => {
        if (action.type === 'CHANGE_POPUP') {
            return {
                ...state,
                popup: action.value
            }
        }

        if (action.type === 'CHANGE_ISLOGIN') {
            return {
                ...state,
                isLogin: action.value
            }
        }
        return state;
    }

    const stores = createStore(reduce)
    return (
        <Provider store={stores}>
            <Fragment>
                <h1>Haiii</h1>
            </Fragment>
        </Provider>

    )
}

export default Coba;