import React from 'react';
import PropTypes from 'prop-types';

const ActionsContainer = ({ classes, children }) => (
  <div className={classes.container}>
    {children}
  </div>
);

ActionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default ActionsContainer;
