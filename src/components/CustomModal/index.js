import './style.scss';

import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoIosClose } from 'react-icons/io';
import { userContext } from '../../utils/context';
import { v4 } from 'uuid';
import { ALERT_SUCCESS } from '../../utils/alertContext';

Modal.setAppElement('#modal-root');

export default function CustomModal({
  open = false,
  id = '',
  isModalOpen = false,
  setModalOpen,
  nameFunction,
  title,
}) {
  const {
    alertFunctions: { createAlert },
  } = useContext(userContext);

  const modalStyles = {
    content: {
      width: '350px',
      top: '35%',
      left: '35%',
      right: 'auto',
      bottom: 'auto',
      padding: '20px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      boxShadow:
        '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
      animation: '.6s ease both animation-1',
    },
  };

  useEffect(() => {
    setModalOpen(open);
    console.log('open', open, isModalOpen);
  }, [open]);

  const closeModal = () => {
    open = false;
    setModalOpen(open);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    nameFunction(id);
    closeModal();
    return createAlert({
      id: v4(),
      title,
      alertType: ALERT_SUCCESS,
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <div className="modal-top-content">
        <button className="modal-exit-button" onClick={closeModal}>
          <IoIosClose />
        </button>
      </div>
      <form className="modal-main-content">
        <div className="modal-heading">
          <h2 className="modal-header">Are you sure?</h2>
          <p className="modal-text">
            Do you really want to delete this item? This process cannot be
            undone.
          </p>
        </div>
        <div className="modal-buttons">
          <button className="button-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="button-delete" onClick={onFormSubmit}>
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
}
