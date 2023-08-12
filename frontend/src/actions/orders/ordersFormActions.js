import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ORDERS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ORDERS_FORM_FIND_STARTED',
      });

      axios.get(`/orders/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ORDERS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ORDERS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/orders'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ORDERS_FORM_CREATE_STARTED',
      });

      axios.post('/orders', { data: values }).then((res) => {
        dispatch({
          type: 'ORDERS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Orders created' });
        dispatch(push('/admin/orders'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ORDERS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDERS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/orders/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ORDERS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Orders updated' });
        dispatch(push('/admin/orders'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ORDERS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
