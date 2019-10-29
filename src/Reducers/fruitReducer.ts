import { Action } from "redux";

const initialState = {};

export function fruitReducer(state = initialState, action: Action) {
    switch (action.type) {
        default: 
          return state;
    } 
}

