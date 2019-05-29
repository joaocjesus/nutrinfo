import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const RemoveIcon = ({ removeField, item }) => {
  if (removeField && item) {
    return (
      <>
        <IconButton
          aria-label='remove-button'
          onClick={() => removeField(item)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton aria-label='disabled-remove-button' disabled>
          <DeleteIcon />
        </IconButton>
      </>
    );
  }
};

RemoveIcon.propTypes = {
  removeField: PropTypes.func,
  item: PropTypes.object,
};

export default RemoveIcon;
