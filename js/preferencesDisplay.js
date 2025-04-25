document.addEventListener('DOMContentLoaded', function() {
    const movieListSection = document.querySelector('.preferences-container');

    async function fetchMovies() {
        // YOUR ACTUAL fetchMovies() CODE HERE
        return {
            "Action": [
                { id: "action1", title: "War", image: "images/War.jpg", genre: "Action", link: "https://www.primevideo.com/dp/amzn1.dv.gti.a0b71d56-64b0-66be-c330-5fda5309d1ce?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "action2", title: "Fighter", image: "images/Fighter.jpg", genre: "Action", link: "https://www.netflix.com/in/title/81698397?source=35" },
                { id: "action3", title: "Dhoom 2", image: "images/dhoom2.jpg", genre: "Action", link: "https://www.primevideo.com/dp/amzn1.dv.gti.02abea89-4676-521d-dac1-41b4689c7045?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "action4", title: "Tiger Zinda Hai", image: "images/tigerzindahai.jpg", genre: "Action", link: "https://www.primevideo.com/dp/amzn1.dv.gti.0ab0ef78-92f3-3898-dcda-d31f96852469?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "action5", title: "Baaghi 2", image: "images/baaghi2.jpg", genre: "Action", link: "https://www.hotstar.com/in/movies/baaghi-2/1000213089?utm_source=gwa" },
                { id: "action6", title: "Simmba", image: "images/simmba.jpg", genre: "Action", link: "https://www.zee5.com/movies/details/simmba/0-0-35166" },
                { id: "action7", title: "Krrish", image: "images/krrish.jpg", genre: "Action", link: "https://www.primevideo.com/detail/Krrish/0S7XE047V000OKJTA7NC49D4YW" },
                { id: "action8", title: "Singham", image: "images/singham.jpg", genre: "Action", link: "https://www.primevideo.com/dp/amzn1.dv.gti.ceb9ac9d-0765-cbc4-f689-a420dcc25993?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "action9", title: "Bang Bang!", image: "images/bangbang.jpg", genre: "Action", link: "https://www.hotstar.com/in/movies/bang-bang/1000161344?utm_source=gwa" },
                { id: "action10", title: "Uri: The Surgical Strike", image: "images/uri.jpg", genre: "Action", link: "https://www.youtube.com/watch?v=vT6uN8_j-W4https://www.zee5.com/movies/details/uri-the-surgical-strike/0-0-33204" },
            ],
            "Comedy": [
                { id: "comedy1", title: "3 Idiots", image: "images/3idiots.jpg", genre: "Comedy", link: "https://www.netflix.com/in/title/70044016" },
                { id: "comedy2", title: "Hera Pheri", image: "images/herapheri.jpg", genre: "Comedy", link: "https://www.primevideo.com/dp/amzn1.dv.gti.d61b6999-56b4-521f-5069-b5b9b739b626?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "comedy3", title: "Andaz Apna Apna", image: "images/andazapnaapna.jpg", genre: "Comedy", link: "https://www.primevideo.com/dp/amzn1.dv.gti.a91d6c9b-7517-5263-d343-e4026865675c?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "comedy4", title: "Welcome", image: "images/welcome.jpg", genre: "Comedy", link: "https://www.netflix.com/in/title/70074744" }
            ],
            "Drama": [
                { id: "drama1", title: "Zindagi Na Milegi Dobara", image: "images/znmd.jpg", genre: "Drama", link: "https://www.netflix.com/in/title/70196459" },
                { id: "drama2", title: "Kabhi Khushi Kabhie Gham", image: "images/k3g.jpg", genre: "Drama", link: "https://www.netflix.com/in/title/60021929" },
                { id: "drama3", title: "Veer-Zaara", image: "images/veerzaara.jpg", genre: "Drama", link: "https://www.primevideo.com/dp/amzn1.dv.gti.71b80f0d-5801-5250-9856-4c28b5b7b953?autoplay=0&ref_=atv_cf_strg_wb" },
                 { id: "drama4", title: "Kal Ho Naa Ho", image: "images/kalhonaaho.jpg", genre: "Drama", link: "https://www.netflix.com/in/title/60031833" }
            ],
            "Thriller": [
                 { id: "thriller1", title: "Drishyam", image: "images/drishyam.jpg", genre: "Thriller", link: "https://www.netflix.com/in/title/80049769" },
                { id: "thriller2", title: "Kahaani", image: "images/kahaani.jpg", genre: "Thriller", link: "https://www.netflix.com/in/title/70213524" },
                { id: "thriller3", title: "Special 26", image: "images/special26.jpg", genre: "Thriller", link: "https://www.netflix.com/in/title/70267243" },
                { id: "thriller4", title: "Raazi", image: "images/raazi.jpg", genre: "Thriller", link: "https://www.primevideo.com/dp/amzn1.dv.gti.54146a89-2016-5e58-86d7-cd15b22b512e?autoplay=0&ref_=atv_cf_strg_wb"}
            ],
            "Romance": [
                { id: "romance1", title: "Dilwale Dulhania Le Jayenge", image: "images/ddlj.jpg", genre: "Romance", link: "https://www.netflix.com/in/title/60036049" },
                { id: "romance2", title: "Kuch Kuch Hota Hai", image: "images/kkhh.jpg", genre: "Romance", link: "https://www.netflix.com/in/title/60000605" },
                { id: "romance3", title: "Jab We Met", image: "images/jabwemet.jpg", genre: "Romance", link: "https://www.primevideo.com/dp/amzn1.dv.gti.7b1fb428-1d21-5079-813c-0e24b15096a6?autoplay=0&ref_=atv_cf_strg_wb" },
                { id: "romance4", title: "Yeh Jawaani Hai Deewani", image: "images/yjhd.jpg", genre: "Romance", link: "https://www.netflix.com/in/title/70288990" }
            ]
        };
    }

    function renderMovies(movies, container) {
        container.innerHTML = '';
        const movieSlider = document.createElement('div');
        movieSlider.classList.add('movie-slider');
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <button class="play-button" data-link="${movie.link || ''}">Play</button>
                    <button class="add-to-list-button" data-id="${movie.id}" data-title="${movie.title}" data-image="${movie.image}">Add to My List</button>
                </div>
            `;
            movieSlider.appendChild(movieCard);
        });
        container.appendChild(movieSlider);
    }

    async function displayPreferredMovies() {
        const moviesByGenre = await fetchMovies();
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];
        movieListSection.innerHTML = '';

        if (userPreferences.length > 0) {
            userPreferences.forEach(genre => {
                if (moviesByGenre[genre]) {
                    const genreSection = document.createElement('div');
                    genreSection.classList.add('genre-section');
                    genreSection.innerHTML = `<h2>${genre}</h2>`;
                    movieListSection.appendChild(genreSection);
                    renderMovies(moviesByGenre[genre], genreSection); // Render movies directly into the genre section
                }
            });
        } else {
            movieListSection.innerHTML = '<p>No preferences selected.</p>';
        }
    }

    displayPreferredMovies();

    // Event listeners (if needed on this page)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-list-button')) {
            // ... your add to list logic ...
        }
        if (event.target.classList.contains('play-button')) {
            // ... your play button logic ...
        }
    });
});