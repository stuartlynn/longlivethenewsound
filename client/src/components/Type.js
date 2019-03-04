import React from 'react'
import Typography from '@material-ui/core/Typography';

export const HeaderLarge = props => (
  <Typography style={{fontSize: '3.0rem'}} variant="display3" gutterBottom>
    {props.children}
  </Typography>
);

export const HeaderSmall = props => (
  <Typography
    variant="display2"
    style={{marginBottom: '10px', marginTop: '20px', fontSize: '2rem'}}
    gutterBottom>
    {props.children}
  </Typography>
);

export const Text = props => (
  <Typography
    variant="body2"
    style={{marginBottom: '10px', fontWeight: 300}}
    gutterBottom>
    {props.children}
  </Typography>
);
