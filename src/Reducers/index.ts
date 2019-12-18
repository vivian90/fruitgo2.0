import {combineReducers} from 'redux';
import {fruitReducer} from './fruitReducer';
import {categoryReducer} from './SearchReducer';

export default combineReducers({
  fruit: fruitReducer,
  search: categoryReducer
});

