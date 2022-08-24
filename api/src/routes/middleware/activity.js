const { Router } = require("express");
const { Country, Activity } = require("../../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const activities = await Activity.findAll()
    res.status(200).send(activities)
  } catch (error) {
      next(error)
  }
})

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    // res.send("sou post de activities");
    const newActivity = await Activity.create({
      name, difficulty, duration, season
    });
    const findCountries = await Country.findAll({
      where: {
        name: countries
      }
    });
    newActivity.addCountries(findCountries);
    res.status(200).send(`La actividad ha sido creada con éxito`)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
