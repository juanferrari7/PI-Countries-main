import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByActivity, getActivities } from "../redux/actions";

export default function FilterByActivity({setCurrentPage}) {
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  function handleActivity(e) {
    dispatch(filterByActivity(e.target.value));
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <select name="activity" onChange={(e) => handleActivity(e)}>
        <option hidden>Filter by activity...</option>
      {activities.map((el) => {
        return <option key={el.name} value={el.name}>{el.name}</option>;
      })}
    </select>
  );
}
