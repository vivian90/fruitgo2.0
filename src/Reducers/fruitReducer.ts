import { Action, OrderItem } from "../types";
import {
  FETCH_FRUITS, 
  BUY_CURRENT_FRUIT, 
  CLEAR_CURRENT_FRUIT, 
  ADD_CUR_TO_CART,
  REMOVE_FRUIT_IN_CART,
  PURCHASE_ALL_FRUITS,
  FruitInfo
} from '../Actions';

interface State {
  fruits: any[];
  currentFruitId: number,
  fruitInCart: FruitInfo,
  orders: OrderItem[]
}
const lb = 'LB'
const count = 'Count' 

const initialState : State = {
  fruits: [],
  currentFruitId: -1,
  fruitInCart: {},
  orders: [{
    fruitList: {1: 2, 3: 3},
    purchaseTime: new Date().toString(),
    sum: 20,
    orderNumber: 1
  }]
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
          fruitInCart: {
            ...state.fruitInCart,
            ...action.fruitInfo
          }
        }
      }
      case REMOVE_FRUIT_IN_CART: {
        let fruitInCart = {...state.fruitInCart};
        delete fruitInCart[action.id];

        return {
          ...state,
          fruitInCart
        }
      }
      case PURCHASE_ALL_FRUITS: {
        let orders = [...state.orders];
        orders.push(action.order);
        let fruitInCart = {};
        return {
          ...state,
          orders,
          fruitInCart
        }
      }
      default: 
          return state;
    } 
}

