import { Link } from "react-router-dom";

export default function Card({ cca3, name, flag, continents }) {
  return (
    <Link to={`/home/${cca3}`}>
      <div key={cca3}>
        <h3>{name}</h3>
        <img src={flag} alt="imagen" height="200px" />
        <p>{continents}</p>
      </div>
    </Link>
  );
}
