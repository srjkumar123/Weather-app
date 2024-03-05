import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 5500;
app.use(express.static('public'));

const API_URL = "https://api.openweathermap.org/data/2.5"

const apiKey = "22ce51feba89ababf47e37a004940476";
const config = {
    headers: {Authorization : `Bearer ${apiKey}`},
};
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", async(req, res) => {
    try {
        const result = await axios.get(API_URL + "/weather", {
            params: {
                q: "gurgaon",
                appid: apiKey,
                units : "metric"
            }
        });
        res.render("get-weather.ejs",{
            country :result.data.sys.country,
            tempC:result.data.main.temp,
            city: result.data.name,
             clouds : result.data.clouds.all,
            wind : result.data.wind.speed,
            humidity : result.data.main.humidity,
            pressure : result.data.main.pressure,
        });
        
    } catch (error) {
        res.render("get-weather.ejs",{content:error})
    }
    
});

app.get("/weather",async(req,res)=>{
    const cityName = req.query.cityname;
    console.log("City Name:", cityName);

   
    try {
        const result = await axios.get(API_URL + "/weather", {
            params: {
                q: cityName,
                appid: apiKey,
                units : "metric"
            }
        });
        console.log( result.data.clouds.all);
        if (!result) {
            return res.render("get-weather.ejs", { error: "Weather data not found for the specified city." });
        }else{
        res.render("get-weather.ejs", {
            country :result.data.sys.country,
        
            city: result.data.name,
            tempC: result.data.main.temp+"°C",
            clouds : result.data.clouds.all,
            wind : result.data.wind.speed,
            humidity : result.data.main.humidity,
            pressure : result.data.main.pressure,
        });  }
    } catch (error) {
        res.render("get-weather.ejs",{ country :"",
        
            city:"Not Found",
            tempC: "",
            clouds :"",
            wind : "",
            humidity : "",
            pressure : "",})
    }
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})