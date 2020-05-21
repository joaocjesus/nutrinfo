import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const TabContainer = ({ value, index, classes, children }) => (
  <>
    {value === index && <Paper elevation={2} className={classes.content}>{children}</Paper>}
  </>
);

TabContainer.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default TabContainer;
