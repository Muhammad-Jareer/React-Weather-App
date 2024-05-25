import { useEffect, useState } from 'react'
import coldBg from './assets/cold.jpeg'
import hotBg from './assets/hot.jpeg'
import Description from './Components/Description'
import { getFormattedWeatherData } from './Components/WeatherAPI/weatherService'

function App() {

  const [city, setCity] = useState("kabul")
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('imperial')
  const [bg, setBg] = useState(hotBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data)

      //Dynamic BG

      const threshold = units === 'metric' ? 20 : 60;
      if (data.forecasts[0].temp <= threshold) setBg(coldBg);
        else setBg(hotBg)
    };

    
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C"
    button.innerText = isCelsius ? 'F' : 'C';
    setUnits(currentUnits => currentUnits === 'metric' ? 'imperial' : 'metric');
    
  }

  const cityName = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <div className='w-full h-screen bg-center bg-cover' style={{backgroundImage: `url(${bg})`}}>
      <div className="w-full h-screen text-white ">
        
      {weather && (
                <div className="max-w-4xl m-auto h-full flex flex-col gap-4 items-center justify-between p-2 sm:p-4">
                {/* Input Section  */}
                <div className="w-full p-4 rounded-lg flex gap-6 items-center justify-between bg-[#000000cb]">
                  <input
                  onKeyDown={cityName}
                  className='border-2 border-white bg-transparent rounded-lg sm:text-xl p-1.5 font-light outline-none'
                  type="text" 
                  name='city' 
                  placeholder='Enter city....' />
                  <button 
                  onClick={(e) => {handleUnitsClick(e)}}
                  className='bg-white text-xl px-3 text-center sm:px-12 rounded-lg py-2 text-black font-normal hover:cursor-pointer hover:bg-gray-300'>{units === 'metric' ? '°C' : '°F'}</button>
                </div>
      
                {/* City Temp  */}
                <div className="w-full p-4 rounded-lg flex items-center justify-between bg-[#000000cb]">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className='text-xl sm:text-2xl sm:font-extrabold'>{`${weather.city}, ${weather.country}`}</h3>
                    <img 
                    src={weather.forecasts[0].makeweatherIcon} 
                    alt="weather icon" />
                    <h3 className='text-xl capitalize sm:text-2xl sm:font-extrabold'>{weather.forecasts[0].weatherDescription}</h3>
                  </div>
      
                  <div className="temprature">
                    <h3 className='text-4xl sm:text-6xl font-extrabold'>{weather.forecasts[0].temp.toFixed()} &#176;{units === 'metric' ? 'C' : 'F'}</h3>
                  </div>
                </div>
      
                {/* Description Component  */}
                <Description weather={weather} units={units} />
              </div>
      )}

      </div>
    </div>
  )
}

export default App
