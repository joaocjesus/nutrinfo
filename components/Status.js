import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const Status = ({ classes, status }) => (
  <>
    <div className={classes.status}>
      {status.map((line, index) => {
        if (line === '') {
          line = <br />;
        }
        return index === 0 ? (
          <ul key={index} className={classes.first}>
            * {line}
          </ul>
        ) : (
          <ul key={index} className={classes.line}>
            {line}
          </ul>
        );
      })}
    </div>
  </>
);

Status.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.array,
};

const styles = {
  status: {
    marginTop: 30,
    backgroundColor: '#ffe',
    maxHeight: 150,
    minHeight: 40,
    overflow: 'auto',
    border: '1px solid lightgrey',
    borderRadius: 10,
  },
  first: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  line: {
    fontSize: '0.8em',
    fontWeight: 'normal',
    margin: 0,
  },
};

export default withStyles(styles)(Status);