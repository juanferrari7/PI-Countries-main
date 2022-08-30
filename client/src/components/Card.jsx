import { Link } from "react-router-dom";
import s from '../styles/Card.module.css'

export default function Card({ cca3, name, flag, continents }) {
  return (
    <Link to={`/home/${cca3}`}>
      <div className={s.card} key={cca3}>
        <h3 className={s.name}>{name}</h3>
        <img src={flag} alt="imagen" height="100px" />
        <p>{continents}</p>
      </div>
    </Link>
  );
}
