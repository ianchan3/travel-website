import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  let REACT_APP_RAPIDAPI_TRAVEL_API_KEY1= "cf511240b0mshac100e7d4ec0d6fp1280f9jsn40e673859dc1"

  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'X-RapidAPI-Key': REACT_APP_RAPIDAPI_TRAVEL_API_KEY1,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
