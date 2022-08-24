import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

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
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      {country ? (
        <>
          <h2>{country.cca3}</h2>
          <h3>{country.name}</h3>
          <img src={country.flag} alt="imagen" />
          <p>Continente: {country.continents}</p>
          <p>
            Capital: {country.capital ? country.capital : "No tiene capital"}
          </p>
          <p>Subregion: {country.subregion}</p>
          <p>Area: {country.area} km2</p>
          <p>Population: {country.population}</p>
          <hr />
          <h3>Activities</h3>
          <hr />
          {country.Activities ? (
            country.Activities.map((el) => {
              return (
                <span key={el.name}>
                  <p>Name:{el.name}</p>
                  <p>Difficulty: {el.difficulty}</p>
                  <p>Duration:{el.duration}</p>
                  <p>Season:{el.season}</p>
                  <hr />
                </span>
              );
            })
          ) : (
            <p>No hay actividades que mostrar</p>
          )}
        </>
      ) : (
        <p>Cargando</p>
      )}
    </div>
  );
}
