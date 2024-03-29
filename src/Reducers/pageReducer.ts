import {CHANGE_PAGE, TOGGLE_FILTERS, SEARCH_BY_TEXT} from '../Actions';
import {Action} from "../types";

const initialState: number = 1;

export default function pageChange(state = initialState, action : Action) {
    switch (action.type) {
        case CHANGE_PAGE: { 
          return action.page  
        }
        case TOGGLE_FILTERS: {
          return 1;
        }
        case SEARCH_BY_TEXT: {
          return 1;
        }
        default: return state;
    }
}  