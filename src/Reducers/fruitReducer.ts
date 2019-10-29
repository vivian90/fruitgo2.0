import { Action } from "../types";
import {FETCH_FRUITS, fetchFruits} from '../Actions';

interface State {
  fruits: any[];
}

const initialState : State = {
  fruits: [],
};

export function fruitReducer(state = initialState, action: Action) {
    switch (action.type) {
      case FETCH_FRUITS: {
         return {
           ...state,
           fruits: action.data
         }
      }
        default: 
          return state;
    } 
}

