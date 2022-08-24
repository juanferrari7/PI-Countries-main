import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../redux/actions";

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
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={search} onChange={onInputChange} placeholder="Search country..."/>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
