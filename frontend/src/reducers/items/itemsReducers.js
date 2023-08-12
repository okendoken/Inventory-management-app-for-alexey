import list from 'reducers/items/itemsListReducers';
import form from 'reducers/items/itemsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
