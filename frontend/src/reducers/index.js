import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import items from 'reducers/items/itemsReducers';

import orders from 'reducers/orders/ordersReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    items,

    orders,
  });
