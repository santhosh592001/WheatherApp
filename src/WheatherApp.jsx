import { useEffect, useState } from "react"
import './WheatherApp.css'

// Parent component


export default function WheatherApp() {

  let api_key = "cd817ea312f6c7ff0ee14e25c7626819";

  const [icon, setIcon] = useState("Rainny.jpg");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("")
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("Chennai");
  const [citynotfound, setnotfound] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null);

  const WeatherIconMap = {
    "01d": "sun.png",
    "01n": "sun.png",
    "02d": "clearsun.png",
    "02n": "clearsun.png",
    "03d": "clearsun.png",
    "03n": "clearsun.png",
    "04d": "Broken.jpg",
    "04n": "Broken.jpg",
    "09d": "Rain.jpg",
    "09n": "Rain.jpg",
    "11d": "darkcloud.webp",
    "11n": "darkcloud.webp",
    "10d": "Rainny.jpg",
    "10n": "Rainny.jpg",
    "13d": "snow.png",
    "13n": "snow.png"
  };

  const search = async ()=>{

    setLoading(true)

let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`

try{

  let res = await fetch(url);
  
  let data = await res.json();

  if(data.cod === "404"){
    console.log("Not found city")
    setnotfound(true)
    setLoading(false)
    return;
  }
  setHumidity(data.main.humidity);
  setWind(data.wind.speed);
  setLat(data.coord.lat);
  setLog(data.coord.lon);
  setCountry(data.sys.country);
  setCity(data.name);
  setTemp(Math.floor(data.main.temp));
  const weatherIconCode = data.weather[0].icon;
 
  setIcon(WeatherIconMap[weatherIconCode] || "clearsun.png" )
   setnotfound(false)
}
catch(error){

  console.log("An Error Accuried :"+ error.message);
  setError(alert("City Not Found"))
   
}

finally{

  setLoading(true);
}

  }



  const handlesearch = (e) =>{

    setText(e.target.value)

  }

  const handleEnterkey = (e)=>{

    if(e.key === "Enter"){

      search()

    }

  }

 useEffect(function(){

  search()

 }, []);


  return (
    
    <div className="container">
      <div className="subcontainer">
 
        <form className="d-flex mt-4">
            <input 
            className="form-control" 
            type='text' 
            id="Search-input" 
            onChange={handlesearch} 
            value={text}
            onKeyDown={handleEnterkey}
            placeholder="Serach Weather"/>

            <button className="btn-primary border-0" 
            id="search-button" 
            onClick={ ()=> search()}
            type="button">Search</button>


            </form>  
              
    <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} 
    humidity={humidity} wind={wind}/>
     
            </div>

        </div>
    
  )

}

// Child component

const WeatherDetails = ({icon, temp , city , country,lat, log, humidity , wind}) =>{

  return(
  
    <>
  
    <div className="image">
     <img src={icon} alt="sunImage" className="img-fluid w-50 d-flex mx-auto mt-4"></img>
    </div>
  
    <div className="temp">
       {temp}°C
    </div>
  
    <div className="Location">
       {city}
    </div>
  
  <div className="country">
  {country}
  </div>
  
  <div className="core">
  
  <div className="lat">Latitude
  <span>{lat}</span>
  </div>
  
  <div className="lat">Longitude
  <span>{log}</span>
  </div>
  
  </div>
  
  <div className="data-container">
    
  <div className="element">
  <img src="waves.jpg"></img>
  <div className="data">
  <div>{humidity}</div>
  <div className="fs-6">Humidity</div>
  </div>
  
  </div>
  
  <div className="element">
  <img src="wind.jpg"></img>
  <div className="data">
  <div>{wind} Km/h</div>
  <div>Wind Speed</div>
  </div>
  
  </div>
  
  </div>



  <div className="copyright">
  
  <div className="text-center mt-4">@CopyRight Designed by Santhosh kumar.D</div>
  
  </div>
  
    </>
  )
  }

