import express from "express";
import https from "https";
import cors from "cors";
import bodyParser from "body-parser";

const port = 5000 || process.env.port; 
const app = express();
app.use(cors());
app.use(express.json());

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/city", function (req, res) {
  const d = req.query;
  const quer = d.city;
  const apiKey = "47a1aa13ada211c2bf4ee4dfee557b36";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    quer +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  //console.log(url);
  https.get(url, function (response) {
    //console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === "404") {
        res.send("City Not Found");
      } else {
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        const imageURL =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        const weatherdata = {
          city: quer,
          temperature: temp,
          description: description,
          imageURL: imageURL,
          condition: "True",
        };
        //console.log(weatherdata);
        res.send(weatherdata);
      }
    });
  });
});


app.listen(port, function () {
  console.log(`Server is running on port {port}`);
});
