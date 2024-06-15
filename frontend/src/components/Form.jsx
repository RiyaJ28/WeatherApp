import React from "react";
import { useState } from "react";
import axios from "axios";
import WeatherReport from "./WeatherReport";
import SVG from "./SVG";

function Form(){
    const [city , setCity] = useState("");
    const [condition , setCondition] = useState("False")
    let d ={};
    const url ="https://weatherapp-backend-a5ry.onrender.com/city" || "http://localhost:5000/city";
    const [weatherData , setWeatherData] = useState({
        city:"",
        temp:"",
        desc:"",
        imageURL:""
    });
    function handleChange(event){
        setCity(event.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(city);
        try{
            const response = await axios.get( url , { params: { city } } );
            //console.log(response.data);
            
            d = response.data;
            if( d === "City Not Found"){
                setCondition("False");
                setCity("");
            }
            else{
                setCondition(d.condition);
            setWeatherData({
                city:d.city,
                temp:d.temperature,
                desc:d.description,
                imageURL:d.imageURL
            })
            //console.log(weatherData);
            setCity("");
            }
             
        } catch (error) {
            console.error("Error:", error);
            // Handle error (optional)
        }
        setCity("");

    }
    if (condition === "False"){
        return(
            <div>
            <form className="row g-3" onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center center">
                <div className="col-auto">
                    <label for="cityInput" className="form-label name">City</label>
                </div>
                <div className="col-7">
                    <input type="text" className="form-control" id="cityInput" name="city" placeholder="Enter City Name" value={city} onChange={handleChange}></input>
                </div>
                <div class="col-auto">
                    <button type="submit" className="btn button">Search</button>
                </div>
            </div>
            
        </form>
        <SVG />
        
        </div>
        )
    }
    else{
        return(
            <div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center center">
                    <div className="col-auto">
                        <label for="cityInput" className="form-label name">City</label>
                    </div>
                    <div className="col-7">
                        <input type="text" className="form-control" id="cityInput" name="city" placeholder="Enter City Name" value={city} onChange={handleChange}></input>
                    </div>
                    <div class="col-auto">
                        <button type="submit" className="btn button">Search</button>
                    </div>
                </div>
                
            </form>
            <div className="row gg">
            <div className="col-md-5 report">
                 <WeatherReport temperature = {weatherData.temp}  description = {weatherData.desc} imageURL = {weatherData.imageURL} city  = {weatherData.city} />
                 </div>
                 <div className="col-md-5">
                    <SVG />
                 </div>
                 
            </div>
            
    
            </div>
            )
    }
    
        
        
}
export default Form;