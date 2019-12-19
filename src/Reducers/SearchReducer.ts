import {FETCH_MENU_INFO, TOGGLE_FILTERS, SEARCH_BY_TEXT} from '../Actions/fetchCategoryInfo';
import {Action} from '../types';

export interface Category {
  id: string,
  category: string,
  title: string,
  isChecked: boolean,
  value: boolean, 
  cateKey: string
}

export interface State {
  categories: Category[],
  searchText: ""
}

const initialState: State = {
  categories: [],
  searchText: ""
}

export function categoryReducer(state = initialState, action: Action) {
    switch (action.type) {
      case FETCH_MENU_INFO: {
        return {
          ...state,
          categories: [...action.data]
        }
      }
      case TOGGLE_FILTERS: {
          let cates = state.categories.map(filter => {
          let tmp = { ...filter }
          if (tmp.id.toString() == action.id) {
            tmp.isChecked = !tmp.isChecked;
          }
          return tmp;
        });
        return {
          ...state,
          categories: cates
        }
      }
      case SEARCH_BY_TEXT: {
        return {
          ...state,
          searchText: action.text
        }
      }
      default: return state;
    }
}