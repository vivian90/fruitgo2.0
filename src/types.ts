import { Action } from 'redux';

export interface Action extends Action {
  [key: string]: any;
}
export enum FruitCategory {
  fresh,
  dried
}
