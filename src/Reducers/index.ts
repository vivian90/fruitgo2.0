import {combineReducers} from 'redux';
import {fruitReducer} from './fruitReducer';
import {categoryReducer} from './SearchReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  fruit: fruitReducer,
  search: categoryReducer,
  pageNumber: pageReducer,
});

