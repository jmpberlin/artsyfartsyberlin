import React from 'react';
import classes from './boxflexwrapper.module.css';

const Boxflexwrapper = (props) => {
  return <div className={classes.solidborderbox}>{props.children}</div>;
};

export default Boxflexwrapper;
