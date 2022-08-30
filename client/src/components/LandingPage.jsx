import { Link } from "react-router-dom";
import s from '../styles/LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Bienvenidos a Countries</h1>
      <Link to='/home'>
        <button className={s.button}>Ingresar</button>
      </Link>
    </div>
  );
}
