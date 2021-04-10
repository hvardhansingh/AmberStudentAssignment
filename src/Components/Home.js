import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Default from './Default';
import Location from './Location';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    maxWidth: '80vw',
    margin: '40px auto 0 auto',
    borderRadius: '30px 30px 30px 30px',
    boxSizing: 'border-box',
  },
  input: {
    marginLeft: '20px',
    flex: 1,
    color: '#004080',
    '&::placeholder' : {
      
    }
  },
  iconButton: {
    padding: 10,
    color: '#004080'
  },
  divider: {
    height: 28,
    margin: 4,
  },
  cards: {
    margin: '15px auto',
    width: 600,
    maxWidth: '80vw',
    borderRadius: '30px',
    padding: '10px',
    boxSizing: 'border-box',
    background: 'rgba(255, 255, 255, 0.8)',
  },
}));

export default function Welcome() {
  const [cities, setCities] = useState([]);
  const [text, setText] = useState('');
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);

  const classes = useStyles();
  const inputRef = useRef(null);

  useEffect(() => {
    if (text.length > 2) {
      axios
        .get(
          `https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name={${text}}`
        )
        .then((res) => {
          // setCities(res.data.data.result);
          setCities(res.data.data.result.slice(0, 5));
        })
        .catch((err) => {
          console.log(err);
        });
    } 
    else {
      setCities([]);
    }
  }, [text]);

  useEffect(() => {
    // setRecent()

    let arr = JSON.parse(localStorage.getItem('__recent__'));
    if (arr) setRecent(arr.reverse());

    // setPopular()

    let localStorageArr = Object.entries(localStorage);
    let index = localStorageArr.findIndex(([f, s]) => {
      return Array.isArray(JSON.parse(s));
    });
    localStorageArr.splice(index, 1);
    localStorageArr.sort(([, a], [, b]) => {
      return b - a;
    });
    localStorageArr = localStorageArr.slice(0, 5);
    let popularCities = [];
    for (let ele of localStorageArr) {
      popularCities.push(ele[0]);
    }
    setPopular(popularCities);
  }, []);

  return (
    <>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Search Cities'
          inputProps={{ 'aria-label': 'search cities' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
        />
        <IconButton
          onClick={() => window.open(`https://google.com/search?q=${text}`)}
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      
      {cities.length > 0 && (
        <div className={classes.cards}>
          {cities.map((city) => {
            return (
              <Location
                key={city.id}
                city={city}
                setRecent={setRecent}
                setPopular={setPopular}
              ></Location>
            );
          })}
        </div>
      )}
      <div className={classes.cards}>
        <Default recent={recent} popular={popular} setText={setText}></Default>
      </div>
    </>
  );
}
