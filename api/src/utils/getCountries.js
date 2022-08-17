const axios = require("axios");
const { Country } = require("../db");

async function getCountries() {

  if(!(await Country.findAll()).length) {
    const api = await axios.get("https://restcountries.com/v3/all");
    const countries = await api.data.map((el) => {
      return {
        cca3: el.cca3,
        name: el.name.common,
        flag: el.flags[1],
        continents: el.continents[0],
        capital: el.capital ? el.capital[0] : "No tiene capital",
        subregion: el.subregion || "No hay datos de subregión",
        area: el.area,
        population: el.population,
      };
    });
  
    await Country.bulkCreate(countries)
  
    console.log("Creamos los paises");

  } else {
    console.log("Ya tengo los países")
  }
}

module.exports = getCountries;
