import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';


export default function Header ({ coordinates, setCoordinates, weather, setWeather }) {
  const classes = useStyles();
  const [autocomplete, setAutoComplete] = useState(null);

  const onLoad = (autoC) => {
    setAutoComplete(autoC)
  }

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  }
  
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=imperial&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
    .then(response => response.json())
    .then(result => {
      setWeather(result);
      console.log(result)
    })
  }, [coordinates])

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Website
        </Typography> 
        <Typography variant="h5" className={classes.title}>
          
        ⛅ {weather?.name} {`Weather`} {`Today: °`}{weather?.main?.temp}
        </Typography> 
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }}/>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}