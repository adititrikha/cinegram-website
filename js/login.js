// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const emailPhoneInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const loginButton = loginForm.querySelector('button[type="submit"]');
    const errorMessageDiv = document.getElementById('login-error-message');

    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();

            const email = emailPhoneInput.value.trim();
            const password = passwordInput.value;

            if (!email || !password) {
                displayError('Please enter your email/phone and password.');
                return;
            }

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Login failed. Please try again.');
                    });
                }
                return response.json();
            })
            .then(data => {
                // Login successful! Store userId and username in localStorage
                localStorage.setItem('userAuthToken', 'true');  //  <-- Add this line
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userName', data.username);
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Error during login:', error);
                displayError(error.message || 'An error occurred during login.');
            });
        });
    }

    function displayError(message) {
        if (errorMessageDiv) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.style.display = 'block';
        } else {
            alert('Error: ' + message);
        }
    }
});



// movies.js  (and mylist.js -  **IDENTICAL CONTENT**)
document.addEventListener('DOMContentLoaded', function() {
    // Check for user authentication here
    const authToken = localStorage.getItem('userAuthToken');
    const userName = localStorage.getItem('userName');

    if (authToken) {
        // User is signed in:
        console.log('User is signed in as:', userName);
        //  Update the UI to show user name, settings, etc.
        const signinLink = document.getElementById('signin-link');
        const loggedInUser = document.getElementById('logged-in-user');
        const usernamePlaceholder = document.getElementById('username-placeholder');

        if (signinLink) {
            signinLink.style.display = 'none';
        }
        if (loggedInUser) {
            loggedInUser.style.display = 'block';
        }
        if (usernamePlaceholder) {
            usernamePlaceholder.textContent = userName;
        }
    } else {
        // User is not signed in:
        console.log('User is not signed in');
        //  Show the sign-in form or link.
        const signinLink = document.getElementById('signin-link');
        const loggedInUser = document.getElementById('logged-in-user');
        if (signinLink) {
            signinLink.style.display = 'block';
        }
        if (loggedInUser) {
            loggedInUser.style.display = 'none';
        }
    }

    //  The rest of your movies.js code (movie display logic) goes here...
    const movieListSection = document.querySelector('.movie-list-section');

    // Updated movie data with a 'source' property, ONLY Bollywood
    const allMovies = [
        { title: "War", genre: "Action", source: "Bollywood", image: "images/War.jpg", link: "[https://www.youtube.com/watch?v=hEDNm_C1vMM](https://www.youtube.com/watch?v=hEDNm_C1vMM)" },
        { title: "Fighter", genre: "Action", source: "Bollywood", image: "images/Fighter.jpg", link: "[https://www.youtube.com/watch?v=rJ8jE1-fMoo](https://www.youtube.com/watch?v=rJ8jE1-fMoo)" },
        { title: "3 Idiots", genre: "Comedy", source: "Bollywood", image: "images/3_idiots_poster.jpg", link: "[https://www.youtube.com/watch?v=xvK6irs-fUM](https://www.youtube.com/watch?v=xvK6irs-fUM)" },
        { title: "Hera Pheri", genre: "Comedy", source: "Bollywood", image: "Hera_Pheri.jpg", link: "[https://www.youtube.com/watch?v=6vW9rM-rtZ0](https://www.youtube.com/watch?v=6vW9rM-rtZ0)" },
        { title: "Baahubali The Beginning", genre: "Action", source: "Bollywood", image: "images/BaahubaliTheBeginning.jpg", link: "[https://www.youtube.com/watch?v=sOEg_YZQsWk](https://www.youtube.com/watch?v=sOEg_YZQsWk)" },
        { title: "Chup Chup Ke", genre: "Comedy", source: "Bollywood", image: "images/Chup Chup Ke.jpg", link: "[https://www.youtube.com/watch?v=WvT_nOIp7-o](https://www.youtube.com/watch?v=WvT_nOIp7-o)" },
        { title: "Pushpa 2 The Rule", genre: "Action", source: "Bollywood", image: "images/Pushpa 2 The Rule.jpg", link: "[https://www.youtube.com/watch?v=jPa5yzt-y3E](https://www.youtube.com/watch?v=jPa5yzt-y3E)" },
        { title: "Welcome", genre: "Comedy", source: "Bollywood", image: "images/Welcome.jpg", link: "[https://www.youtube.com/watch?v=rM0E7jxL-Mw](https://www.youtube.com/watch?v=rM0E7jxL-Mw)" },
        { title: "Talaash: The Answer Lies Within", genre: "Crime", source: "Bollywood", image: "images/Talaash_poster.jpg", link: "" },
    ];

    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <button class="play-button" data-link="${movie.link}">Play</button>
                <button class="add-to-list-button" 
                        data-id="${movie.title.replace(/\s+/g, '-').toLowerCase()}" 
                        data-title="${movie.title}" 
                        data-image="${movie.image}">
                    Add to My List
                </button>
            </div>
        `;
        return movieCard;
    }

    function renderMovies(movies, targetElement) {
        targetElement.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            targetElement.appendChild(movieCard);
        });
    }

    const userPreferencesData = localStorage.getItem('userPreferences');
    const userPreferences = userPreferencesData ? JSON.parse(userPreferencesData) : [];

    console.log("User Preferences:", userPreferences);
    const bollywoodMovies = allMovies.filter(movie => movie.source === "Bollywood");
    const filteredMovies = userPreferences.length > 0
        ? bollywoodMovies.filter(movie => {
            console.log("Checking:", movie.genre, userPreferences.includes(movie.genre));
            return userPreferences.includes(movie.genre);
          })
        : bollywoodMovies;

    console.log("Filtered Movies:", filteredMovies);
    movieListSection.innerHTML = '';

    if (filteredMovies.length > 0) {
        const moviesByGenre = {};
        filteredMovies.forEach(movie => {
            if (!moviesByGenre[movie.genre]) {
                moviesByGenre[movie.genre] = [];
            }
            moviesByGenre[movie.genre].push(movie);
        });

        for (const genre in moviesByGenre) {
            const genreSection = document.createElement('div');
            genreSection.classList.add('genre-section');
            genreSection.innerHTML = `<h2>${genre}</h2><div class="movie-slider-container"><div class="movie-slider"></div><button class="slider-control left-arrow">❮</button><button class="slider-control right-arrow">❯</button></div>`;
            movieListSection.appendChild(genreSection);
            const movieSlider = genreSection.querySelector('.movie-slider');
            renderMovies(moviesByGenre[genre], movieSlider);
        }
    } else {
        movieListSection.innerHTML = '<p>No movies found for your selected genres.</p>';
    }

    // Event listener for "Add to My List" buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-list-button')) {
            const button = event.target;
            const movieId = button.getAttribute('data-id');
            const movieTitle = button.getAttribute('data-title');
            const movieImage = button.getAttribute('data-image');

            const movieToAdd = { id: movieId, title: movieTitle, image: movieImage };

            let cinegramMylist = localStorage.getItem('cinegram_mylist');
            cinegramMylist = cinegram_mylist ? JSON.parse(cinegram_mylist) : [];

            const alreadyInList = cinegram_mylist.some(movie => movie.id === movieId);

            if (!alreadyInList) {
                cinegram_mylist.push(movieToAdd);
                localStorage.setItem('cinegram_mylist', JSON.stringify(cinegram_mylist));
                console.log('Movie added to My List:', movieToAdd);
                button.textContent = 'Added!';
                button.disabled = true;
            } else {
                console.log('Movie is already in My List.');
            }
        }
    });

    // Event listener for "Play" buttons
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('play-button')) {
            const button = event.target;
            const link = button.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            } else {
                console.log('Play button has no data-link attribute.');
            }
        }
    });

    // Slider functionality
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('slider-control')) {
            const sliderContainer = event.target.closest('.genre-section');
            const movieSlider = sliderContainer.querySelector('.movie-slider');
            const cardWidth = 220;
            const scrollAmount = cardWidth * 2;

            if (event.target.classList.contains('left-arrow')) {
                movieSlider.scrollLeft -= scrollAmount;
            } else {
                movieSlider.scrollLeft += scrollAmount;
            }
        }
    });
});
