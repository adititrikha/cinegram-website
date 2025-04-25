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
        // action movies
        { title: "War", genre: "Action", source: "Bollywood", image: "images/War.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.a0b71d56-64b0-66be-c330-5fda5309d1ce?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Fighter", genre: "Action", source: "Bollywood", image: "images/Fighter.jpg", link: "https://www.netflix.com/in/title/81698397?source=35" },
        { title: "Dhoom 2", genre: "Action", source: "Bollywood", image: "images/dhoom2.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.02abea89-4676-521d-dac1-41b4689c7045?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Tiger Zinda Hai", genre: "Action", source: "Bollywood", image: "images/tigerzindahai.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.0ab0ef78-92f3-3898-dcda-d31f96852469?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Baaghi 2", genre: "Action", source: "Bollywood", image: "images/baaghi2.jpg", link: "https://www.hotstar.com/in/movies/baaghi-2/1000213089?utm_source=gwa" },
        { title: "Simmba", genre: "Action", source: "Bollywood", image: "images/simmba.jpg", link: "https://www.zee5.com/movies/details/simmba/0-0-35166" },
        { title: "Krrish", genre: "Action", source: "Bollywood", image: "images/krrish.jpg", link: "https://www.primevideo.com/detail/Krrish/0S7XE047V000OKJTA7NC49D4YW" },
        { title: "Singham", genre: "Action", source: "Bollywood", image: "images/singham.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.ceb9ac9d-0765-cbc4-f689-a420dcc25993?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Bang Bang!", genre: "Action", source: "Bollywood", image: "images/bangbang.jpg", link: "https://www.hotstar.com/in/movies/bang-bang/1000161344?utm_source=gwa" },
        { title: "Uri: The Surgical Strike", genre: "Action", source: "Bollywood", image: "images/uri.jpg", link: "https://www.youtube.com/watch?v=vT6uN8_j-W4https://www.zee5.com/movies/details/uri-the-surgical-strike/0-0-33204" },

        // comedy movies
        { title: "3 Idiots", genre: "Comedy", source: "Bollywood", image: "images/3_idiots_poster.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.3ab5ef58-05e2-9566-9c5a-e2d491536133?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Hera Pheri", genre: "Comedy", source: "Bollywood", image: "images/herapheri.jpg", link: "https://www.youtube.com/watch?v=TIQ5hrfermg" },
        { title: "Welcome", genre: "Comedy", source: "Bollywood", image: "images/Welcome.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.7cb98547-56e6-118e-0eaa-da762376824f?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Chup Chup Ke", genre: "Comedy", source: "Bollywood", image: "images/Chup Chup Ke.jpg", link: "https://www.netflix.com/in/title/70052249?source=35" },
        { title: "Andaz Apna Apna", genre: "Comedy", source: "Bollywood", image: "images/andazapnaapna.jpg", link: "https://www.youtube.com/watch?v=ttCUfDtrYlU" },
        {title: "Munna Bhai M.B.B.S.", genre: "Comedy", source: "Bollywood", image: "images/munnabhai.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.0eb620e0-09e4-053f-0dbe-9e498c8a1017?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "PK", genre: "Comedy", source: "Bollywood", image: "images/pk.jpg", link: "https://www.netflix.com/in/title/70303496?source=35" },
        { title: "Dhamaal", genre: "Comedy", source: "Bollywood", image: "images/dhamaal.jpeg", link: "https://www.zee5.com/movies/details/dhamaal/0-0-155786?utm_source=google_web&utm_medium=watchaction&utm_campaign=google_watch&utm_content=dhamaal" },
        { title: "Golmaal: Fun Unlimited", genre: "Comedy", source: "Bollywood", image: "images/golmaal.jpeg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.96b46d60-87ef-dd38-84e2-9e39fe5cb08d?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Housefull", genre: "Comedy", source: "Bollywood", image: "images/housefull.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.9aba5a62-c2cf-0f04-133f-5e82bf9abc93?autoplay=0&ref_=atv_cf_strg_wb" },
        
        // crime movies
        { title: "Talaash: The Answer Lies Within", genre: "Crime", source: "Bollywood", image: "images/Talaash_poster.jpg", link: "https://www.netflix.com/in/title/70262614?source=35" },
        { title: "Drishyam", genre: "Crime", source: "Bollywood", image: "images/drishyam.jpg", link: "https://www.hotstar.com/in/movies/drishyam/1000074189?utm_source=gwa" },
        { title: "Pink", genre: "Crime", source: "Bollywood", image: "images/pink.jpg", link: "https://www.hotstar.com/in/movies/pink/1000154578?utm_source=gwa" },
        { title: "Raman Raghav 2.0", genre: "Crime", source: "Bollywood", image: "images/ramanraghav.png", link: "https://www.zee5.com/movies/details/raman-raghav-20/0-0-8143" },
        { title: "Gangs of Wasseypur", genre: "Crime", source: "Bollywood", image: "images/gangsofwasseypur.jpeg", link: "https://www.netflix.com/in/title/80088678?source=35" },
        { title: "Black Friday", genre: "Crime", source: "Bollywood", image: "images/blackfriday.jpg", link: "https://www.youtube.com/watch?v=GOUT7djWlqc" },
        { title: "A Wednesday!", genre: "Crime", source: "Bollywood", image: "images/awednesday.jpg", link: "https://www.netflix.com/in/title/70107499?source=35" },
        { title: "Special 26", genre: "Crime", source: "Bollywood", image: "images/special26.jpg", link: "https://www.youtube.com/watch?v=2Tx7pJrmBBs" },
        { title: "Badlapur", genre: "Crime", source: "Bollywood", image: "images/badlapur.jpg", link: "https://www.zee5.com/movies/details/badlapur/0-0-movie_1123118342" },
        { title: "Raees", genre: "Crime", source: "Bollywood", image: "images/raees.jpg", link: "https://www.netflix.com/in/title/80164778?source=35" },
        
        //Adventure movies 
        { title: "Zindagi Na Milegi Dobara", genre: "Adventure", source: "Bollywood", image: "images/zindaginamilegidobara.jpg", link: "https://www.netflix.com/in/title/70202336?source=35" },
        { title: "Yeh Jawaani Hai Deewani", genre: "Adventure", source: "Bollywood", image: "images/yehjawanihaideewani.jpg", link: "https://www.netflix.com/in/title/70276515?source=35" },
        { title: "Dil Chahta Hai", genre: "Adventure", source: "Bollywood", image: "images/dilchahtahai.jpg", link: "https://www.netflix.com/in/title/60021525?source=35" },
        { title: "Highway", genre: "Adventure", source: "Bollywood", image: "images/highway.jpeg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.5ab38822-62d4-472d-be79-b00d34665576?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Queen", genre: "Adventure", source: "Bollywood", image: "images/queen.jpeg", link: "https://www.netflix.com/in/title/80032081?source=35" },
        { title: "Karwaan", genre: "Adventure", source: "Bollywood", image: "images/karwaan.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.c4b2e75e-cb0f-805d-f745-597716856d29?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Jab We Met", genre: "Adventure", source: "Bollywood", image: "images/jabwemet.jpeg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.40b44d0c-4760-3773-5e98-b63d0c79b7e2?autoplay=0&ref_=atv_cf_strg_wb" },
        { title: "Tamasha", genre: "Adventure", source: "Bollywood", image: "images/tamasha.jpg", link: "https://www.netflix.com/in/title/80087743?source=35" },
        { title: "Barfi!", genre: "Adventure", source: "Bollywood", image: "images/barfi.jpg", link: "https://www.netflix.com/in/title/70219525?source=35" },
        { title: "Piku", genre: "Adventure", source: "Bollywood", image: "images/piku.jpeg", link: "https://www.sonyliv.com/movies/piku-1000007677?utm_source=Google&utm_medium=WatchNow&utm_campaign=1000007677" },

        // Animation
        { title: "Roadside Romeo", genre: "Animation", source: "Bollywood", image: "images/roadsideromeo.jpg", link: "https://www.google.co.in/search?q=roadside+romeo+full+movie&sca_esv=1243c2b95c154fbe&biw=1600&bih=765&ei=a3MKaOLzMZmWvr0Pm5_Z8QY&oq=roadside+romeo+&gs_lp=Egxnd3Mtd2l6LXNlcnAiD3JvYWRzaWRlIHJvbWVvICoCCAAyCxAAGIAEGJECGIoFMgsQABiABBiRAhiKBTILEAAYgAQYkQIYigUyBRAAGIAEMgUQABiABDIFEC4YgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESL0IUMMCWMMCcAF4AZABAJgBvwGgAb8BqgEDMC4xuAEByAEA-AEBmAICoAL4AcICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgIOEAAYsAMY5AIY1gTYAQHCAhMQLhiABBiwAxhDGMgDGIoF2AEBmAMAiAYBkAYTugYGCAEQARgJkgcFMS4wLjGgB_sHsgcDMi0xuAfSAQ&sclient=gws-wiz-serp#fpstate=ive&vld=cid:fe8a000f,vid:EVn6LbyaR5g,st:0" },
        { title: "Jumbo", genre: "Animation", source: "Bollywood", image: "images/jumbo.jpg", link: "https://www.youtube.com/watch?v=yGLvOObL9lc&t=1s" },
        { title: "Arjun: The Warrior Prince", genre: "Animation", source: "Bollywood", image: "images/arjun.jpg", link: "https://www.primevideo.com/detail/Arjun-The-Warrior-Prince/0N9NY7BO0DKTGC8JIQIP2BQVLY" },
        { title: "Hanuman", genre: "Animation", source: "Bollywood", image: "images/hanuman.jpg", link: "https://www.youtube.com/watch?v=NSmzueYlFUY&t=1s" },
        { title: "My Friend Ganesha", genre: "Animation", source: "Bollywood", image: "images/myfriendganesha.jpeg", link: "https://www.youtube.com/watch?v=3tS1IbHaQ_U&t=2s" },
        { title: "Goopi Gawaiya Bagh Bajaiya", genre: "Animation", source: "Bollywood", image: "images/goopi.jpeg", link: "https://in.bookmyshow.com/movies/nashik/ggbb-goopi-gawaiya-bagha-bajaiya/ET00093272" },
        { title: "Kochadaiiyaan", genre: "Animation", source: "Bollywood", image: "images/kochadaiiyaan.jpeg", link: "https://www.youtube.com/watch?v=0pNlTHxYGik" },
        { title: "Chaalis ChaurasiChhota Bheem and the Curse of Damyaan", genre: "Animation", source: "Bollywood", image: "images/chotabheem.jpeg", link: "https://www.youtube.com/watch?v=jBhrlHhyoA0" },
        { title: "Toonpur Ka Super Hero", genre: "Animation", source: "Bollywood", image: "images/toonpur.jpeg", link: "https://www.zee5.com/kids/kids-movies/toonpur-ka-super-hero/0-0-toonpurkasuperhero" },
        { title: "Bal Ganesh", genre: "Animation", source: "Bollywood", image: "images/balganesh.jpeg", link: "https://www.hotstar.com/in/movies/bal-ganesh/1260103016?utm_source=gwa" },

         // Documentary
        { title: "Curry & Cyanide: The Jolly Joseph Case", genre: "Documentary", source: "Bollywood", image: "images/curry&cyanide.jpeg", link: "https://www.netflix.com/in/title/81564452" },
        { title: "Yo Yo Honey Singh: Famous", genre: "Documentary", source: "Bollywood", image: "images/yoyohoneysingh.jpeg", link: "https://www.netflix.com/in/title/81487929?source=35" },
        { title: "To Kill a Tiger", genre: "Documentary", source: "Bollywood", image: "images/tiger.jpeg", link: "https://www.netflix.com/in/title/81766865" },
        { title: "I Am (2010 Indian film)", genre: "Documentary", source: "Bollywood", image: "images/iam.jpeg", link: "https://www.youtube.com/watch?v=yNT30GsOZY8" },
        { title: "Gulabi Gang", genre: "Documentary", source: "Bollywood", image: "images/gulabi.jpg", link: "https://www.primevideo.com/detail/Gulaab-Gang-English-Subtitled/0GYZLMQ1DLM7ZJA63U7GHQORCX" },
        { title: "All That Breathes", genre: "Documentary", source: "Bollywood", image: "images/AllThatBreathes.jpeg", link: "https://www.hotstar.com/in/movies/all-that-breathes/1971000720?utm_source=gwa" },
        { title: "The Elephant Whisperers", genre: "Documentary", source: "Bollywood", image: "images/elephants.jpeg", link: "https://www.netflix.com/in/title/81312835?source=35" },
        { title: "No Fathers in Kashmir", genre: "Documentary", source: "Bollywood", image: "images/nofathers.jpeg", link: "https://www.youtube.com/watch?v=bUkR6395p44&list=PLlgkjluj88Q85KQFZkQpuPBfpZxHF-LJh&index=1" },
        { title: "Buddha in a Traffic Jam", genre: "Documentary", source: "Bollywood", image: "images/buddha.jpeg", link: "https://www.youtube.com/watch?app=desktop&v=YrqSvC7BVS4" },
        { title: "Searching for Sheela", genre: "Documentary", source: "Bollywood", image: "images/sheela.jpg", link: "https://www.netflix.com/in/title/81211264?source=35" },
        
        // Drama
        //{ title: "Do Bigha Zamin", genre: "Action", source: "Bollywood", image: "images/DoBighaZamin.jpg", link: "https://www.primevideo.com/dp/amzn1.dv.gti.59db5460-070d-41e8-a6e4-8a854c72d789?autoplay=0&ref_=atv_cf_strg_wb" },
        //{ title: "Mother India", genre: "Action", source: "Bollywood", image: "images/MotherIndia.jpeg", link: "https://www.youtube.com/watch?v=cpml6vGAVXU" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },
        //{ title: "", genre: "Action", source: "Bollywood", image: "images/.jpg", link: "" },

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

    document.addEventListener('DOMContentLoaded', function() {
        // ... (your existing authentication check code)
    
        const movieListSection = document.querySelector('.movie-list-section');
        const allMovies = [ /* your movie data */ ];
    
        function createMovieCard(movie) { /* your createMovieCard function */ }
    
        function renderMovies(movies, targetElement) { /* your renderMovies function */ }
    
        const userPreferencesData = localStorage.getItem('userPreferences');
        const userPreferences = userPreferencesData ? JSON.parse(userPreferencesData) : [];
    
        console.log("User Preferences:", userPreferences);
    
        // Filter for Bollywood movies AND user preferences
        const bollywoodMovies = allMovies.filter(movie => movie.source === "Bollywood");
        let filteredMovies = userPreferences.length > 0
            ? bollywoodMovies.filter(movie => {
                console.log("Checking:", movie.genre, userPreferences.includes(movie.genre));
                return userPreferences.includes(movie.genre);
              })
            : bollywoodMovies;
    
        // Sort movies by genre
        filteredMovies.sort((a, b) => {
            const genreA = a.genre.toUpperCase();
            const genreB = b.genre.toUpperCase();
            if (genreA < genreB) {
                return -1;
            }
            if (genreA > genreB) {
                return 1;
            }
            return 0;
        });
    
        console.log("Filtered and Sorted Movies:", filteredMovies);
    
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
    
        // ... (your event listener code)
    });
    
});

//fix for add to my list

// Event listener for "Add to My List" buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-list-button')) {
        const button = event.target;
        const movieId = button.getAttribute('data-id');
        const movieTitle = button.getAttribute('data-title');
        const movieImage = button.getAttribute('data-image');

        const movieToAdd = { id: movieId, title: movieTitle, image: movieImage };

        // Correct way to get the item from localStorage
        let cinegramMylistData = localStorage.getItem('cinegram_mylist');
        let cinegramMylist = cinegramMylistData ? JSON.parse(cinegramMylistData) : [];

        const alreadyInList = cinegramMylist.some(movie => movie.id === movieId);

        if (!alreadyInList) {
            cinegramMylist.push(movieToAdd);
            localStorage.setItem('cinegram_mylist', JSON.stringify(cinegramMylist));
            console.log('Movie added to My List:', movieToAdd);
            button.textContent = 'Added!';
            button.disabled = true;
        } else {
            console.log('Movie is already in My List.');
        }
    }
});