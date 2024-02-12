import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '3ba9ff4570c42e44229e0aa047e4ab9b'; // Remplacez par votre clé API OpenWeatherMap

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3ba9ff4570c42e44229e0aa047e4ab9b`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      axios.get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Lieu non trouvé. Veuillez réessayer.');
          setLoading(false);
        });
      setLocation('');
    }
  };

  useEffect(() => {
    setError('');
  }, [location]);

  const traduireDescription = (description) => {
    const traductions = {
      'Clear': 'Dégagé',
      'Clouds': 'Nuageux',
      'Rain': 'Pluie',
      'Drizzle': 'Bruine',
      'Thunderstorm': 'Orage',
      'Snow': 'Neige',
      'Mist': 'Brume',
      // Ajoutez d'autres traductions au besoin
    };
    return traductions[description] || description;
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Entrez un endroit'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {loading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p>{error}</p>
            ) : data.main ? (
              <h1>{data.main.temp.toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{traduireDescription(data.weather[0].main)}</p> : null}
          </div>

              




        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Ressenti</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidité</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} m/s</p> : null}
              <p>Vent</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
