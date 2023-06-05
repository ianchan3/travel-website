import React, { useEffect, useState, useRef } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from './services/index';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

export default function App () {
  
  const [places, setPlaces] = useState([]);
  const [weather, setWeather] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const homeRef = useRef();


useEffect(() => {
  // Geolocation to retrieve user position
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
    setCoordinates({ lat: latitude, lng: longitude });
    console.log(coordinates)
  })
}, []);

useEffect(() => {
  const filteredPlaces = places?.filter((place) => place?.rating > rating);
  setFilteredPlaces(filteredPlaces)
}, [rating])

useEffect(() => {
  if (bounds.sw && bounds.ne) {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
    .then((data) => {
      setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setIsLoading(false);
      homeRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }
}, [type, bounds]);

  return (
    <div>
      <CssBaseline />
      <div ref={homeRef}/>
      <Header setCoordinates={setCoordinates} coordinates={coordinates} weather={weather} setWeather={setWeather} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces?.length ? filteredPlaces : places} childClicked={childClicked} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} places={filteredPlaces?.length ? filteredPlaces : places} setChildClicked={setChildClicked} />
        </Grid>
      </Grid>
    </div>
  )
}