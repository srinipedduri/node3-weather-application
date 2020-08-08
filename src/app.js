const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getWeather = require("./geocode");

console.log("my first express program");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    pageOwner: "srinivas",
    msg: "****get it over with****",
    title: "HOME",
    footer: " Footer - Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageOwner: "srinivas",
    msg: "****get it over with****",
    title: "ABOUT",
    footer: " Footer - About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    pageOwner: "srinivas",
    msg: "****get it over with****",
    title: "HELP",
    footer: " Footer - Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    res.send({ error: "location not provided" });
  } else {
    getWeather(req.query.location, (result) => {
      if (result.error) {
        res.send(result);
      } else {
        // res.send(result);
        res.send({
          temperature: result.currentWeather.temperature,
          forecast: result.currentWeather.weather_descriptions,
          place: result.location,
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log("starting the server");
});
