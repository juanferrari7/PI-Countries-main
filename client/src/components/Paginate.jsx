export default function Paginate({ countriesPerPage, allCountries, paginate }) {
  const pageNumbers = [];

  let maxPages = 1 + Math.ceil((allCountries - 9) / countriesPerPage);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <span key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </span>
        ))}
      </ul>
    </nav>
  );
}
