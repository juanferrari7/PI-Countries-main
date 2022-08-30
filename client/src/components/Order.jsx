import { useDispatch } from "react-redux"
import { sortCountries } from "../redux/actions"
import s from '../styles/Filter.module.css'

export default function Order() {
    const dispatch = useDispatch()
    function handleOrder(e) {
        dispatch(sortCountries(e.target.value))
      }
    return (
        <select className={s.filter} id="orderId" name="sort" onChange={(e) => handleOrder(e)} placeholder="Order by">
            <option hidden>Order by...</option>
            <option value="ASCENDENTE">A-Z</option>
            <option value="DESCENDENTE">Z-A</option>
            <option value="+POPULATION">+Population</option>
            <option value="-POPULATION">-Population</option>
        </select>
    )
}