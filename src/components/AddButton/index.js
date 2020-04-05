import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function AddButton({
  onClick,
  leftIcon,
  rightIcon,
  children = 'Add new task',
}) {
  return (
    <div onClick={onClick} className="button-add">
      {leftIcon ? <div style={{ marginRight: 6 }}>{leftIcon}</div> : null}

      <p>{children}</p>

      {rightIcon ? <div style={{ marginLeft: 6 }}>{rightIcon}</div> : null}
    </div>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.string.isRequired,
};
