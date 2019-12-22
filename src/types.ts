import { Action } from 'redux';
import { FruitInfo } from './Actions';

export interface Action extends Action {
  [key: string]: any;
}
export enum FruitCategory {
  fresh,
  dried
}

export type OrderItem = {
  fruitList: FruitInfo,
  purchaseTime: string,
  sum: number,
  orderNumber: number
}
