import s from '../styles/Paginate.module.css'

export default function Paginate({ countriesPerPage, allCountries, paginate, currentPage }) {
  const pageNumbers = [];

  let maxPages = 1 + Math.ceil((allCountries - 9) / countriesPerPage);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={s.paginate}>
      <ul>
        {pageNumbers.map((number) => (
          <span key={number}>
            <button className={currentPage === number ? s.active :  s.buttons} onClick={() => paginate(number)}>{number}</button>
          </span>
        ))}
      </ul>
    </nav>
  );
}
