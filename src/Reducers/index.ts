import {combineReducers} from 'redux';
import {fruitReducer} from './fruitReducer';

export default combineReducers({fruit: fruitReducer});

