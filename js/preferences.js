document.addEventListener('DOMContentLoaded', function() {
    const savePreferencesButton = document.getElementById('save-preferences-btn');
    const movieRecommendationsDiv = document.getElementById('movie-recommendations');
    const movieGrid = movieRecommendationsDiv.querySelector('.movie-grid');

    // **IMPORTANT:** Replace this with your actual function to fetch movies!
    async function fetchMovies() {
        //  YOUR ACTUAL fetchMovies() CODE HERE
        //  This should return an object like:
        //  {
        //      "Action": [{id: "1", title: "Movie 1", image: "url1.jpg"}, ...],
        //      "Comedy": [{id: "2", title: "Movie 2", image: "url2.jpg"}, ...]
        //  }
        return {
            "Action": [
                { id: "action1", title: "War", image: "images/War.jpg" },
                { id: "action2", title: "Fighter", image: "images/Fighter.jpg" }
            ],
            "Comedy": [
                { id: "comedy1", title: "Hera Pheri", image: "images/Hera_Pheri.jpg" },
                { id: "comedy2", title: "Andaz Apna Apna", image: "images/Andaz_Apna_Apna.jpg" }
            ]
            // ... more genres and movies
        };
    }

    function renderMovies(movies) {
        movieGrid.innerHTML = ''; // Clear previous movies
        if (movies && movies.length > 0) {
            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');
                movieCard.innerHTML = `
                    <img src="<span class="math-inline">\{movie\.image\}" alt\="</span>{movie.title}">
                    <div class="movie-info">
                        <h3><span class="math-inline">\{movie\.title\}</h3\>
<button class\="play\-button" data\-link\="\#"\>Play</button\>
<button class\="add\-to\-list\-button" data\-id\="</span>{movie.id}" data-title="<span class="math-inline">\{movie\.title\}" data\-image\="</span>{movie.image}">Add to My List</button>
                    </div>
                `;
                movieGrid.appendChild(movieCard);
            });
        } else {
            movieGrid.innerHTML = '<p>No movies to display.</p>';
        }
    }

    if (savePreferencesButton) {
        savePreferencesButton.addEventListener('click', async function() {
            const genreCheckboxes = document.querySelectorAll('input[name="genre"]:checked');
            const selectedGenres = Array.from(genreCheckboxes).map(checkbox => checkbox.value);

            localStorage.setItem('userPreferences', JSON.stringify(selectedGenres));
            console.log('Saved preferences:', selectedGenres);

            // Fetch movies and filter based on preferences
            const allMovies = await fetchMovies();
            let recommendedMovies = [];
            selectedGenres.forEach(genre => {
                if (allMovies[genre]) {
                    recommendedMovies = recommendedMovies.concat(allMovies[genre]);
                }
            });

            // Render the recommended movies
            renderMovies(recommendedMovies);
        });
    } else {
        console.error('Save Preferences button not found!');
    }
});