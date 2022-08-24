import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCountries, postActivity } from "../redux/actions";

function validate(form) {
    let errors = {}
    if (!form.name) {
        errors.name = "Name is required";
    } else if (!form.season) {
        errors.season = "Season is required"
    }

    return errors
}

export default function CreateActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allCountries = useSelector((state) => state.allCountries);

  //Ordeno los paises para mostrarlos en el select
  let countries = allCountries.sort(function (a, b) {
    if (a.name > b.name) {return 1;}
    if (a.name < b.name) {return -1}
    return 0;
  });

//   Estados locales para el form
  const [errors, setErrors] = useState({})
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
    setErrors(validate({
        ...form,
        [e.target.name] : e.target.value
    }))
  }

  function handleCountrySelect(e) {
    if(!form.countries.includes(e.target.value)) {
        setForm({
            ...form,
            countries: [...form.countries, e.target.value]
        })
    }
    console.log(form)
  }

  function handleCountryDelete(el) {
    setForm({
        ...form,
        countries: form.countries.filter((country) => country !== el)
    })
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
    history.push("/home")
  }

//   Para desplegar todos los paises en el select de countries
  useEffect(() => {
    dispatch(getCountries());
    console.log(form)
  }, [dispatch, form]);


  return (
    <div>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>

      <h1>Create your activity</h1>
      <br />
      <form onSubmit={(e) => onSubmit(e)}>
        {/* NAME */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => onInputChange(e)}
          />
          {errors.name && (
            <p>{errors.name}</p>
          )}
        </div>
        <br />
        {/* DIFFICULTY */}
        <div>
          <label>Difficulty:</label>
          <select name="difficulty" onChange={(e) => onInputChange(e)}>
            <option hidden>Difficulty of the activity...</option>
            <option value={1}>1 - Very easy</option>
            <option value={2}>2 - Easy</option>
            <option value={3}>3 - Normal</option>
            <option value={4}>4 - Hard</option>
            <option value={5}>5 - Expert</option>
          </select>
        </div>
        <br />
        {/* DURATION */}
        <div>
          <label>Duration (hs):</label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <br />
        {/* SEASON */}
        <div>
          <label>Season:</label>
          <select name="season" onChange={(e) => onInputChange(e)}>
            <option hidden>Select season...</option>
            <option value="Summer">Summer</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="All the year">All the year</option>
          </select>
          {errors.season && (
            <p>{errors.season}</p>
          )}
        </div>
        <br />
        {/* COUNTRIES */}
        <div>
          <label>Countries:</label>
          <select name="countries" onChange={(e) => handleCountrySelect(e)}>
            <option hidden>Select countries...</option>
            {countries.map((country) => (
              <option key={country.cca3} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <br />
          {form.countries.map((el) => (
            <span key={el}>
                <span>{el}</span>
                <button onClick={()=> handleCountryDelete(el)}>X</button>
            </span>
          ))}
        </div>

        <button type="submit" disabled={errors.name || errors.season}>Create activity</button>
      </form>
    </div>
  );
}
