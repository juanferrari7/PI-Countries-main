const { Router } = require("express");
const { Country, Activity } = require("../../db");
const { getCountries } = require("../functions");

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const countries = await getCountries();
  try {
    if (name) {
      let countryName = countries.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      countryName.length
        ? res.status(200).send(countryName)
        : res.status(404).send("No se encontró un país con el nombre indicado");
    } else {
      res.status(200).send(countries);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
    let {id} = req.params
    id = id.toUpperCase()
    try {
        let country = await Country.findByPk(id, {
            include: {
                model: Activity,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
        res.status(200).send(country)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
