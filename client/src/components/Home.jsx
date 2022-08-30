import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../redux/actions";
import Card from "./Card";
import FilterByActivity from "./FilterByActivity";
import FilterByContinent from "./FilterByContinent";
import Order from "./Order";
import Paginate from "./Paginate";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import s from "../styles/Home.module.css"

export default function Home() {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry =
    currentPage === 1 ? 9 : currentPage * countriesPerPage - 1;
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage; // 0
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleRefresh(e) {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
    document.getElementById("continentFilter").selectedIndex = 0;
    document.getElementById("activityFilter").selectedIndex = 0;
    document.getElementById("orderId").selectedIndex = 0;
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
        <div className={s.nav}>
          <SearchBar setCurrentPage={setCurrentPage} />
          {/* Recargar países */}
          <span className={s.padding}><button className={s.button} onClick={(e) => handleRefresh(e)}>Refresh</button></span>
          <Link to="/create">
            <span className={s.padding}><button className={s.button}>Create Activity</button></span>
          </Link>
        </div>

      <div className={s.nav}>
        {/* Ordenamiento alfabético y por población */}
        <Order />
        {/* Filtrado por continente */}
        <FilterByContinent setCurrentPage={setCurrentPage} />
        {/* Filtrado por actividad (que todavia no sirve)*/}
        <FilterByActivity setCurrentPage={setCurrentPage} />
      </div>

        {/* Paginado */}
      <div>
        <Paginate
          countriesPerPage={countriesPerPage}
          allCountries={countries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        {currentCountries.length ? (
          currentCountries.map((el) => {
            return (
              <Card
                key={el.cca3}
                cca3={el.cca3}
                name={el.name}
                flag={el.flag}
                continents={el.continents}
              />
            );
          })
        ) : (
          <p> Cargando </p>
        )}
      </div>
    </div>
  );
}
