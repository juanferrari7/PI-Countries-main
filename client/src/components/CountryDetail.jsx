import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import s from "../styles/CountryDetail.module.css";

export default function CountryDetail() {
  const [country, setCountry] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((c) => {
        setCountry(c.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  console.log(country);
  return (
    <div className={s.container}>
      <div className={s.detail}>
        <Link to="/home">
          <button className={s.button}>Back to Home</button>
        </Link>
        {country ? (
          <>
            <h2>{country.cca3}</h2>
            <h3>{country.name}</h3>
            <img src={country.flag} alt="imagen" />
            <p><u>Continente:</u> {country.continents}</p>
            <p>
              <u>Capital:</u> {country.capital ? country.capital : "No tiene capital"}
            </p>
            <p><u>Subregion:</u> {country.subregion}</p>
            <p><u>Area:</u> {country.area} km2</p>
            <p><u>Population:</u> {country.population}</p>
            <hr />
            <h3>Activities</h3>
            <span>(Difficulty levels: 1-Very easy / 2-Easy / 3-Normal / 4-Hard / 5-Expert)</span>
            <hr />
            {country.Activities?.length > 0 ? (
              country.Activities.map((el) => {
                return (
                  <span className={s.activity} key={el.name}>
                    <p><u>Name:</u> {el.name}</p>
                    <p><u>Difficulty:</u> {el.difficulty}</p>
                    <p><u>Duration:</u> {el.duration}</p>
                    <p><u>Season:</u> {el.season}</p>
                  </span>
                );
              })
            ) : (
              <p><strong>No hay actividades que mostrar</strong></p>
            )}
          </>
        ) : (
          <p>Cargando</p>
        )}
      </div>
    </div>
  );
}
