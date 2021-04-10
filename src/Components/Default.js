import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  cards: {
    margin: '5px auto',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
  },
  cityName: {
    color: '#E6485D',
    textAlign: 'left',
    fontWeight: '500',
  },
  heading: {
    textAlign: 'left',
    padding: '10px',
    color: '#004080',
    // color: '#E6485D',
    fontSize: '0.95em'
  },
  btnGroup: {
    margin: '5px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  btn: {
    margin: '5px',
    borderRadius: '30px',
    fontSize: '0.82rem',
    border: '1px solid #E6485D',
    color: '#E6485D',
    fontWeight: '600',
    textTransform: 'capitalize',
    '&:hover' : {
        color: 'white',
        background: '#E6485D'
    }
  },
  description: {
    textAlign: 'left',
    fontWeight: 300,
    padding: '0 10px',
    color: '#E6485D'
  },
}));

export default ({ recent, popular, setText }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.heading}>Recent Searches</div>
      {recent.length === 0 && (
        <div className={classes.description}>
          Most recent searches will appear here.
        </div>
      )}
      {
        <div className={classes.btnGroup}>
          {recent.map((recentCity) => {
            return (
              <Button
                key={recentCity}
                onClick={() => setText(recentCity)}
                variant='outlined'
                className={classes.btn}
              >
                {recentCity}
              </Button>
            );
          })}
        </div>
      }
      <Divider variant='middle'></Divider>
      {/* {recent.length === 0 && <Divider variant='middle' />} */}
      <div className={classes.heading}>Popular Cities</div>
      {popular.length === 0 && (
        <div className={classes.description}>
          Most popular cities will appear here.
        </div>
      )}
      {
        <div className={classes.btnGroup}>
          {popular.map((popularCity) => {
            return (
              <Button
                key={popularCity}
                onClick={() => setText(popularCity)}
                variant='outlined'
                className={classes.btn}
              >
                {popularCity}
              </Button>
            );
          })}
        </div>
      }
    </div>
  );
};
