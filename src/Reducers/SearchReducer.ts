import React, { Component } from 'react'
import {fetchCategoryInfo, FETCH_MENU_INFO, toggleFilter, TOGGLE_FILTERS} from '../Actions/fetchCategoryInfo';
import {Action} from '../types';

export interface Category {
  id: string,
  category: string,
  title: string,
  isChecked: boolean,
  value: boolean, 
  cateKey: string
}

const initialState: Category[] = []

export function categoryReducer(state = initialState, action: Action) {
    switch (action.type) {
      case FETCH_MENU_INFO: {
        return [...action.data];
      }
      case TOGGLE_FILTERS: {
       return state.map(filter => {
          let tmp = { ...filter }
          if (tmp.id.toString() == action.id) {
            tmp.isChecked = !tmp.isChecked;
          }
          return tmp;
        })  
      }
      default: return state;
    }
}