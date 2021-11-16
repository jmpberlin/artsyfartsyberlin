import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function IconButtons(props) {
  return (
    <IconButton
      onClick={props.clickHandler}
      color='primary'
      aria-label='add to shopping cart'
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
}
