import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'ITEMS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'ITEMS_FORM_FIND_STARTED',
      });

      axios.get(`/items/${id}`).then((res) => {
        const record = res.data;

        dispatch({
          type: 'ITEMS_FORM_FIND_SUCCESS',
          payload: record,
        });
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEMS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/items'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'ITEMS_FORM_CREATE_STARTED',
      });

      axios.post('/items', { data: values }).then((res) => {
        dispatch({
          type: 'ITEMS_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Items created' });
        dispatch(push('/admin/items'));
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEMS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ITEMS_FORM_UPDATE_STARTED',
      });

      await axios.put(`/items/${id}`, { id, data: values });

      dispatch(doInit());

      dispatch({
        type: 'ITEMS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Items updated' });
        dispatch(push('/admin/items'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'ITEMS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
