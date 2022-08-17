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
                attributes: ["name", "cca3", "flag", "continents"]
            })
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