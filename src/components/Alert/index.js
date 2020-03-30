import React, { useContext } from 'react';
import {
  ALERT_SUCCESS,
  ALERT_DEFAULT,
  ALERT_ERROR,
} from '../../utils/alertContext';
import {
  IoMdCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  AiOutlineExclamationCircle,
} from 'react-icons/all';
import './style.scss';
import { userContext } from '../../utils/context';

export const Alert = ({ id, title, type }) => {
  const {
    alertFunctions: { deleteAlert },
  } = useContext(userContext);

  if (type === ALERT_SUCCESS) {
    return (
      <div className="success-alert">
        <div className="success-alert-main">
          <IoMdCheckmarkCircleOutline />
          {title}
        </div>
        <button onClick={() => deleteAlert({ id })}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    );
  }

  if (type === ALERT_ERROR) {
    return (
      <div className="error-alert">
        <div className="error-alert-main">
          <AiOutlineExclamationCircle />
          {title}
        </div>
        <button onClick={() => deleteAlert({ id })}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    );
  }

  if (type === ALERT_DEFAULT) {
    return <div>{title}</div>;
  }

  throw new TypeError('Provided type to Alert component is wrong');
};
