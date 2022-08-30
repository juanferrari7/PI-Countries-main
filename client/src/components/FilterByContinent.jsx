import { useDispatch } from "react-redux";
import { filterByContinent } from "../redux/actions";
import s from '../styles/Filter.module.css'

export default function FilterByContinent({setCurrentPage}) {
  const dispatch = useDispatch();

  function handleContinent(e) {
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1)
    document.getElementById("activityFilter").selectedIndex = 0;
    document.getElementById("orderId").selectedIndex = 0;

  }
  return (
    <select className={s.filter} id="continentFilter" name="continent" onChange={(e) => handleContinent(e)}>
      <option hidden>Filter by continent...</option>
      <option value="All">All</option>
      <option value="America">America</option>
      <option value="Africa">Africa</option>
      <option value="Europe">Europe</option>
      <option value="Asia">Asia</option>
      <option value="Antarctica">Antarctica</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
