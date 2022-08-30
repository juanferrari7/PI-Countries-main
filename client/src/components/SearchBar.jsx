import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../redux/actions";
import s from "../styles/SearchBar.module.css"

export default function SearchBar({setCurrentPage}) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  function onInputChange(e) {
    e.preventDefault()
    setSearch(e.target.value);
    setCurrentPage(1)
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(searchCountries(search));
    setSearch("");
  }

  return (
    <span className={s.container}>
      <form onSubmit={onSubmit}>
        <input className={s.search} type="text" value={search} onChange={onInputChange} placeholder="Search country..."/>
        <input className={s.button} type="submit" value="Search" />
      </form>
    </span>
  );
}
