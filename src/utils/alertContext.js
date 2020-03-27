import { useReducer } from 'react';

const initialState = {
  alerts: [],
};

const CREATE_ALERT = 'CREATE_ALERT';
const DELETE_ALERT = 'DELETE_ALERT';

export const ALERT_DEFAULT = 'ALERT_DEFAULT';
export const ALERT_SUCCESS = 'ALERT_SUCCESS';
export const ALERT_ERROR = 'ALERT_ERROR';

const alertReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          {
            id: action.id,
            title: action.title,
            type: action.alertType,
          },
        ],
      };
    case DELETE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.id),
      };
    default:
      throw new TypeError('You was provided bad type');
  }
};

export const useAlertState = () => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return {
    alerts: state.alerts,
    deleteAlert: ({ id }) => dispatch({ type: DELETE_ALERT, id }),
    createAlert: ({ id, title, alertType }) => {
      dispatch({ type: CREATE_ALERT, id, title, alertType });
      setTimeout(() => {
        dispatch({ type: DELETE_ALERT, id });
      }, 4000);
    },
  };
};

export const useAlert = () => {
  const { alerts, deleteAlert, createAlert } = useAlertState();
  return { alerts, deleteAlert, createAlert };
};
