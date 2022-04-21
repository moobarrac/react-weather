import './App.css';
import React, {useState} from 'react'
const api = {
  key: '736a5de1590339b9f3dea5ca0618651f',
  base: 'https://api.openweathermap.org/data/2.5/'
}



function App() {
  const [input, setInput] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState({state: true, msg: 'Input city or state and press enter...'})

  const search = async (evt) =>  {
    if(evt.key === 'Enter') {
      try {
        const response = await fetch(`${api.base}weather?q=${input}&units=metrics&APPID=${api.key}`)
        const data = await response.json()
        setWeather(data)
        setLoading({state: false, msg: ''})
        setInput('')
      } catch (error) {
        setLoading({state: true, msg: "Check your network connection or input a valid city or state"})
      }
    }
  }

  const getWeather = () => {
    if(weather.main.temp >  308) {
      return 'Fire'
    }
    if(weather.main.temp <= 308 && weather.main.temp > 291 ) {
      return 'Sunny'
    }
    if(weather.main.temp <= 291 && weather.main.temp > 286) {
      return 'Warm'
    }
    if(weather.main.temp <= 286 && weather.main.temp > 276 ){
      return 'Cool'
    }
    else{
      return 'Cold'
    }
  }


  const getDate = () =>  {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const year = new Date().getFullYear()
    const month = months[new Date().getMonth()]
    const date = new Date().getDate()
    const day = days[new Date().getDay()]

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 286) ? 'App'  : 'App cold') : 'App'}>
      <main>
        <div className="search-box">
          <input type="text" 
            className='search-bar' 
            placeholder='Search...' 
            onChange={e => setInput(e.target.value)} 
            value={input}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{getDate()}</div>
          </div>
          <div className="weather-box">
              <div className="temp">
                {Math.floor(weather.main.temp - 273)}°c
              </div>
              <div className="weather">
                {getWeather()}
              </div>
          </div>
          <div className="other-box">
            <div className="container">
              <div className="humy">
                <div className="amount">{weather.main.humidity}%</div>
                <div className="title">Humidity</div>
              </div>
              <div className="wind">
                <div className="amount">{weather.wind.speed}m/s</div>
                <div className="title">Wind</div>
              </div>
              <div className="humy">
                <div className="amount">{weather.main.pressure}Pa</div>
                <div className="title">Pressure</div>
              </div>
            </div>
          </div>
        </>
        ) : (<div className='loading'>{loading.msg}</div>)}
      </main>
    </div>
  );
}

export default App;
