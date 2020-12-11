import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  flex: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0'
  }
})

export default function Comments(
  {
    data
  }
) {
  const classes = useStyles();
  return (
    <Box m={1}>
      {data.map(comment => (
        <div className={classes.flex}>
          <Avatar />
          <Typography variant="subtitle2" key={comment.id}>
            {comment.username}: {comment.text}
          </Typography>
        </div>
      ))}
    </Box>
  )
}
