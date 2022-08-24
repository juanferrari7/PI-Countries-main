const axios = require('axios');
const { Country, Activity } = require('../../db');

module.exports = {
    getCountries: async function () {
        try {
            let countries = await Country.findAll({
                include: {
                    model: Activity,
                    attributes: ["name", "difficulty", "season", "duration"],
                    through: {
                        attributes: [],
                    }
                },
                attributes: ["name", "cca3", "flag", "continents", "population"]
            });
            countries = countries.map((el) => ({
                name: el.name,
                cca3: el.cca3,
                flag: el.flag,
                continents: el.continents,
                population: el.population,
                Activities: el.Activities.map((el) => el.name)
            }))
            return countries
        } catch (error) {
            console.log(error)
        }
    },
    findById: async function (id) {
        try {
            let country = await axios.get(`https://restcountries.com/v3/alpha/${id}`);
            return country
        } catch (error) {
            console.log(error)
        }
    }
}