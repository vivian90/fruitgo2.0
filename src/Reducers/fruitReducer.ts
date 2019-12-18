import { Action } from "../types";
import {FETCH_FRUITS, fetchFruits, FETCH_FRUITS_BY_FILTERS, fetchFruitsByFilter} from '../Actions';

interface State {
  fruits: any[];
}
const lb = 'LB'
const count = 'Count' 
const initialState : State = {
  fruits: []
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

