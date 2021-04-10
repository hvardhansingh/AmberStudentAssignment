import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import Divider from '@material-ui/core/Divider';

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
    marginBottom: '2px',
  },
  stateCountry: {
    textAlign: 'left',
    fontSize: '0.95em',
    color: '#004080'
  },
  icon: {
      color: '#004080'
  }
}));

export default ({ city, setRecent, setPopular }) => {
  const classes = useStyles();
  let country = '';
  let state = '';
  if (city && city.location.country) country = city.location.country.long_name;
  if (city && city.location.state) state = city.location.state.long_name;

  if (country) {
    if (state) {
      state = state + ' , ';
    }
  }

  const clickHandler = (city) => {
    window.open(`https://google.com/search?q=${city.name}`);

    let val = Number(localStorage.getItem(city.name));
    val = val + 1;
    localStorage.setItem(city.name, String(val));

    let recent = JSON.parse(localStorage.getItem('__recent__')) || [];
    const idx = recent.indexOf(city.name);
    if (idx > -1) {
      recent.splice(idx, 1);
    }
    recent.push(city.name);
    if (recent.length > 5) {
      recent.shift();
    }
    localStorage.setItem('__recent__', JSON.stringify(recent));
    setRecent(recent.reverse());

    //-----------------------

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
  };

  return (
    <div>
      <div className={classes.cards} onClick={() => clickHandler(city)}>
        <RoomIcon className={classes.icon} />
        <div className={classes.details}>
          <div className={classes.cityName}> {city.name} </div>
          <div className={classes.stateCountry}>
            {state}
            {country}
          </div>
        </div>
      </div>
      <Divider variant='middle' />
    </div>
  );
};
