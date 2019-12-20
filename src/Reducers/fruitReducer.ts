import { Action } from "../types";
import {FETCH_FRUITS, BUY_CURRENT_FRUIT, CLEAR_CURRENT_FRUIT, ADD_CUR_TO_CART} from '../Actions';

export interface FruitItem {
  id: number,
  quantity: number
}
interface State {
  fruits: any[];
  currentFruitId: number,
  fruitInCart: FruitItem[]
}
const lb = 'LB'
const count = 'Count' 
const initialState : State = {
  fruits: [],
  currentFruitId: -1,
  fruitInCart: []
};

export function fruitReducer(state = initialState, action: Action) {
    switch (action.type) {
      case FETCH_FRUITS: {
         return {
           ...state,
           fruits: action.data
         }
      }
      case BUY_CURRENT_FRUIT: {
        return {
          ...state,
          currentFruitId: action.id
        }
      }
      case CLEAR_CURRENT_FRUIT: {
        return {
          ...state,
          currentFruitId: -1
        }
      }
      case ADD_CUR_TO_CART: {
        return {
          ...state,
          fruitInCart: [...state.fruitInCart, action.fruit]
        }
      }
      default: 
          return state;
    } 
}

