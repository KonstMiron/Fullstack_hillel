const API_KEY = '8050236a';
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
let debounceTimer;

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  const query = searchInput.value.trim();

  if (query.length === 0) {
    results.innerHTML = '';
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchMovies(query);
  }, 500);
});

async function fetchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True') {
      displayResults(data.Search);
    } else {
      results.innerHTML = `<p>Нічого не знайдено...</p>`;
    }
  } catch (error) {
    results.innerHTML = `<p>⚠️ Сталася помилка при завантаженні даних</p>`;
    console.error('API error:', error);
  }
}

function displayResults(movies) {
  results.innerHTML = movies
    .map((movie) => {
      return `
      <div class="card">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year} | ${movie.Type}</p>
      </div>
    `;
    })
    .join('');
}