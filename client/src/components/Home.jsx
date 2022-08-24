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

export default function Home() {
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry =
  currentPage === 1 ? 9 : currentPage * countriesPerPage -1; 
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
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <div>
        <SearchBar setCurrentPage={setCurrentPage}/>
        {/* Ordenamiento alfabético y por población */}
        <Order />
        {/* Filtrado por continente */}
        <FilterByContinent setCurrentPage={setCurrentPage}/>
        {/* Filtrado por actividad (que todavia no sirve)*/}
        <FilterByActivity setCurrentPage={setCurrentPage}/>
        {/* Recargar países */}
        <button onClick={(e) => handleRefresh(e)}>Refresh</button>
        <Link to="/create"><button>Create Activity</button></Link>

        {/* Paginado */}
        <Paginate
          countriesPerPage={countriesPerPage}
          allCountries={countries.length}
          paginate={paginate}
        />
      </div>
      <div>
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
          <p>Cargando</p>
        )}
      </div>
    </div>
  );
}
