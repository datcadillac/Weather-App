import React, {useEffect} from 'react';
import axios from 'axios';
import GetCurrentLocation from './getLocationService';
import LocationData from '../model/LocationData';
import CurrentCondition from '../model/CurrentCondition';

function GetCurrentWeather() {
  const [currentCondition, setCurrentCondition] =
    React.useState<CurrentCondition>();

  const latLong = GetCurrentLocation();
  useEffect(() => {
    latLong != undefined ? fetchData(latLong) : null;
  }, [latLong]);

  const fetchData = async (latLong: LocationData | undefined) => {
    await axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: 'a95ac2295269448094c170846231903',
          q: `${latLong?.latitude},${latLong?.longitude}`,
          lang: 'vi',
        },
      })
      .then(response => {
        setCurrentCondition({
          condition_text: response.data.current.condition.text,
          temp_c: Math.round(parseInt(response.data.current.temp_c)),
          name: response.data.location.name,
          time: response.data.location.localtime,
          condition_code: response.data.current.condition.code,
          is_day: response.data.current.is_day,
        });
      })
      .catch(error => {
        console.error('Network error:', error);
      });
  };
  return currentCondition;
}
export default GetCurrentWeather;
