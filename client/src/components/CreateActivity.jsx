import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getActivities, getCountries, postActivity } from "../redux/actions";
import s from "../styles/CreateActivity.module.css";

// Para validar el formulario

export default function CreateActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCountries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);

  function validate(form) {
    let errors = {};
    if (!form.name || /\s/g.test(form.name)) {
      errors.name = "Name is required, spaces aren't allowed";
    } else if (!/^[a-zA-Z0-9& áéíóú]+$/.test(form.name)) {
      errors.name =
        "Activity name is invalid, no special characters are allowed";
    } else if (!activities.every((el) => el.name !== form.name)) {
      errors.name = "Activity name already in use";
    }

    if (!form.duration) {
      errors.duration = "Duration is required";
    } else if (!/^([1-9][0-9]+|[1-9])/.test(form.duration)) {
      errors.duration = "Duration must be a positive number";
    } else if (form.duration > 24 || form.duration === 0) {
      errors.duration = "Duration must be a number between 24 and 1";
    }

    if (!form.difficulty) {
      errors.difficulty = "Difficulty is required";
    }

    if (!form.season) {
      errors.season = "Season is required";
    }

    if (form.countries.length === 0) {
      errors.countries = "Select at least one country";
    }

    return errors;
  }
  //Ordeno los paises para mostrarlos en el select
  let countries = allCountries.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  //   Estados locales para el form
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  //   Handles
  function onInputChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCountrySelect(e) {
    if (!form.countries.includes(e.target.value)) {
      setForm({
        ...form,
        countries: [...form.countries, e.target.value],
      });
    }
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
    document.getElementById("countriesSelect").selectedIndex = 0;
    console.log(form);
  }

  function handleCountryDelete(e) {
    setForm({
      ...form,
      countries: form.countries.filter((country) => country !== e),
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(form));
    alert("Activity created");
    setForm({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  }

  //   Para desplegar todos los paises en el select de countries
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
    console.log(form);
    console.log(errors);
  }, [dispatch, form, errors]);

  return (
    <div className={s.container}>
      <div className={s.create}>
        <Link to="/home">
          <button className={s.button}>Back to Home</button>
        </Link>

        <h1>Create your activity</h1>
        {/* <br /> */}
        <form onSubmit={(e) => onSubmit(e)}>
          {/* NAME */}
          <div className={s.inputContainer}>
            <label>Name:</label>
            <input
              className={s.input}
              type="text"
              name="name"
              placeholder="Write a name..."
              value={form.name}
              onChange={(e) => onInputChange(e)}
            />
            {/* Mostrar validaciones */}
            {errors.name && <span className={s.dangerText}>{errors.name}</span>}
          </div>
          <br />
          {/* DIFFICULTY */}
          <div>
            <label>Difficulty:</label>
            <select
              name="difficulty"
              onChange={(e) => onInputChange(e)}
              className={s.input}
            >
              <option hidden>Difficulty of the activity...</option>
              <option value={1}>1 - Very easy</option>
              <option value={2}>2 - Easy</option>
              <option value={3}>3 - Normal</option>
              <option value={4}>4 - Hard</option>
              <option value={5}>5 - Expert</option>
            </select>
            {/* Mostrar validaciones */}
            {errors.difficulty && (
              <span className={s.dangerText}>{errors.difficulty}</span>
            )}
          </div>
          <br />
          {/* DURATION */}
          <div>
            <label>Duration (hs):</label>
            <input
              className={s.input}
              type="number"
              name="duration"
              value={form.duration}
              placeholder="Duration of the activity..."
              onChange={(e) => onInputChange(e)}
            />
            {/* Mostrar validaciones */}
            {errors.duration && <span className={s.dangerText}>{errors.duration}</span>}
          </div>
          <br />
          {/* SEASON */}
          <div>
            <label>Season:</label>
            <select
              name="season"
              onChange={(e) => onInputChange(e)}
              className={s.input}
            >
              <option hidden>Select season...</option>
              <option value="Summer">Summer</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="All the year">All the year</option>
            </select>
            {/* Mostrar validaciones */}
            {errors.season && <span className={s.dangerText}>{errors.season}</span>}
          </div>
          <br />
          {/* COUNTRIES */}
          <div>
            <label>Countries:</label>
            <select
              id="countriesSelect"
              name="countries"
              onChange={(e) => handleCountrySelect(e)}
              className={s.input}
            >
              <option hidden>Select countries...</option>
              {countries.map((country) => (
                <option key={country.cca3} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {/* Mostrar validaciones */}
            {errors.countries && <span className={s.dangerText}>{errors.countries}</span>}

            <br />
            <div>
              {form.countries.map((el) => (
                <span key={el}>
                  <span>{el}</span>
                  <button onClick={() => handleCountryDelete(el)}>X</button>
                </span>
              ))}
            </div>
          </div>
          <br />
          <button
            type="submit"
            disabled={
              errors.name ||
              errors.season ||
              errors.difficulty ||
              errors.duration ||
              errors.countries ||
              !form.name ||
              !form.season ||
              !form.difficulty ||
              !form.duration ||
              form.countries.length === 0
            }
            className={s.button}
          >
            Create activity
          </button>
        </form>
      </div>
    </div>
  );
}
