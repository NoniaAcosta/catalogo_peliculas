const apiKey = '6ade8d0be2557e6a91692c14c9eae565'; // Reemplaza con tu clave API
const apiUrl = 'https://api.themoviedb.org/3';
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('movie-details');
const details = document.getElementById('movie-details');
const detailsContainer = document.getElementById('details');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const favoritesList = document.getElementById('favorites-list');
const addToFavoritesButton = document.getElementById('add-to-favorites');
let selectedMovieId = null;
let favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];
//console.log(favoriteMovies);

// Fetch and display popular movies
async function fetchPopularMovies() {
    try {
        // tu codigo aqui: realiza una solicitud para obtener las películas populares
        // y llama a displayMovies con los resultados
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`); // Realiza una solicitud GET a la API
            const populares = await response.json(); // Convierte la respuesta a JSON
            displayMovies(populares); // Llama a la función
        } catch (error) {
            console.error('Error fetching tasks:', error); // Maneja y muestra errores de la solicitud
        }
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Display movies
function displayMovies(movies) {
    lista = movies.results;
    movieList.innerHTML = ''; // Limpia la lista de películas
    lista.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <span>${movie.title}</span>
        `;
        li.onclick = () => showMovieDetails(movie.id); // Muestra detalles al hacer clic en la película
        movieList.appendChild(li);
    });
}

// Show movie details
async function showMovieDetails(movieId) {
    try {
        // tu codigo aqui: realiza una solicitud para obtener los detalles de la película
        // y actualiza el contenedor de detalles con la información de la película
        detailsContainer.innerHTML = ''; // Limpia la lista de películas elegidas
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`); // Realiza una solicitud GET a la API
        const det_peliculas = await response.json(); // Convierte la respuesta a JSON
        const seccion = document.createElement('div');
        seccion.innerHTML = `
                <h3>${det_peliculas.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500${det_peliculas.poster_path}" alt="${det_peliculas.title}">
                <p>${det_peliculas.overview}</p>
                <p><strong>Fecha de Lanzamiento: </strong>${det_peliculas.release_date}</p>
                <input type="hidden" id="movie_id" value="${movieId}">
            `;
        detailsContainer.appendChild(seccion);
        movieDetails.style.display = "block";
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Search movies
searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    if (query) {
        try {
            // tu codigo aqui: realiza una solicitud para buscar películas
            // y llama a displayMovies con los resultados de la búsqueda
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
            const busqueda = await response.json();
            displayMovies(busqueda);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }
});

// Add movie to favorites
addToFavoritesButton.addEventListener('click', () => {
    selectedMovieId=document.getElementById("movie_id").value;
    if (selectedMovieId) {
        const favoriteMovie = {
            id: selectedMovieId,
            title: document.querySelector('#details h3').textContent
        };
        if (!favoriteMovies.some(movie => movie.id === selectedMovieId)) {
            favoriteMovies.push(favoriteMovie);
            localStorage.setItem('favorites', JSON.stringify(favoriteMovies)); // Guarda en localStorage
            displayFavorites(); // Muestra la lista actualizada de favoritos
        }
    }
});

// Display favorite movies
function displayFavorites() {
    favoritesList.innerHTML = ''; // Limpia la lista de favoritos
    favoriteMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        favoritesList.appendChild(li);
    });
}

// Initial fetch of popular movies and display favorites
fetchPopularMovies(); // Obtiene y muestra las películas populares
displayFavorites(); // Muestra las películas favoritas guardadas
