import { combineReducers } from 'redux';
import csvLists from './csv-lists';

const widgetsReducer = combineReducers({ csvLists });

export default widgetsReducer;
