import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByActivity, getActivities } from "../redux/actions";
import s from '../styles/Filter.module.css'

export default function FilterByActivity({setCurrentPage}) {
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  function handleActivity(e) {
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1)
    document.getElementById("orderId").selectedIndex = 0;

  }

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <select className={s.filter} id="activityFilter" name="activity" onChange={(e) => handleActivity(e)}>
        <option hidden>Filter by activity...</option>
      {activities.map((el) => {
        return <option key={el.id} value={el.name}>{el.name}</option>;
      })}
    </select>
  );
}
