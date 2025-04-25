document.addEventListener('DOMContentLoaded', function() {
    const usernameDisplay = document.getElementById('username-placeholder');
    const loggedInUserDiv = document.getElementById('logged-in-user');
    const signinLink = document.getElementById('signin-link');
    const signoutLink = document.getElementById('signout-link');
    const preferencesLink = document.getElementById('preferences-link');
    const preferencesModal = document.getElementById('preferences-modal');
    const genreSelectionDiv = document.getElementById('genre-selection');
    const settingsLink = document.getElementById('settings-link');
    const settingsModal = document.getElementById('settings-modal');
    const changePasswordButton = document.getElementById('change-password-btn');
    const deleteAccountButton = document.getElementById('delete-account-btn');
    const changePasswordModal = document.getElementById('change-password-modal');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    const addToListButtons = document.querySelectorAll('.movie-card .add-to-list-button');
    const playButtons = document.querySelectorAll('.movie-card .play-button');

    //const loggedInUsername = sessionStorage.getItem('username');  // Changed to localStorage
    const loggedInUsername = localStorage.getItem('userName');
    const cinegramMylistData = localStorage.getItem('cinegram_mylist');
    const cinegramMylist = cinegramMylistData ? JSON.parse(cinegramMylistData) : [];

    function updateLoginState() {
        if (loggedInUsername) {
            if (usernameDisplay) usernameDisplay.textContent = loggedInUsername;
            if (loggedInUserDiv) loggedInUserDiv.style.display = 'block';
            if (signinLink) signinLink.style.display = 'none';
        } else {
            if (loggedInUserDiv) loggedInUserDiv.style.display = 'none';
            if (signinLink) signinLink.style.display = 'block';
        }
    }

    // Call updateLoginState on every page load
    updateLoginState();

    // Update "Add to My List" button states on page load
    if (addToListButtons) { //check if the element exists
        addToListButtons.forEach(button => {
            const movieId = button.getAttribute('data-id');
            const alreadyInList = cinegramMylist.some(movie => movie.id === movieId);
            if (alreadyInList) {
                button.textContent = 'Added!';
                button.disabled = true;
            } else {
                button.textContent = 'Add to My List'; // Ensure default text
                button.disabled = false; // Ensure enabled by default
            }
        });

        addToListButtons.forEach(button => {
            button.addEventListener('click', function() {
                const movieId = this.getAttribute('data-id');
                const movieTitle = this.getAttribute('data-title');
                const movieImage = this.getAttribute('data-image');

                const movieToAdd = { id: movieId, title: movieTitle, image: movieImage };

                let currentMylist = localStorage.getItem('cinegram_mylist');
                currentMylist = currentMylist ? JSON.parse(currentMylist) : [];

                const alreadyInListNow = currentMylist.some(movie => movie.id === movieId);

                if (!alreadyInListNow) {
                    currentMylist.push(movieToAdd);
                    localStorage.setItem('cinegram_mylist', JSON.stringify(currentMylist));
                    console.log('Movie added to My List:', movieToAdd);
                    this.textContent = 'Added!';
                    this.disabled = true;
                } else {
                    console.log('Movie is already in My List.');
                    const updatedList = currentMylist.filter(movie => movie.id !== movieId);
                    localStorage.setItem('cinegram_mylist', JSON.stringify(updatedList));
                    this.textContent = 'Add to My List';
                    this.disabled = false;
                }
            });
        });
    }


    if (playButtons) {  // Check if the element exists
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const link = this.getAttribute('data-link');
                if (link) {
                    window.open(link, '_blank'); // Opens the link in a new tab
                } else {
                    console.log('Play button has no data-link attribute.');
                }
            });
        });
    }

    // Attach event listener to signout link
    if (signoutLink) {
        signoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Sign Out link clicked!");
            localStorage.removeItem('userId');  // Changed from sessionStorage
            localStorage.removeItem('userName'); // Changed from sessionStorage
            localStorage.removeItem('preferencesSet');
            localStorage.removeItem('userAuthToken'); //added this
            window.location.href = 'login.html';
        });
    }

    // Attach event listener to preferences link
    if (preferencesLink && preferencesModal) {
        preferencesLink.addEventListener('click', function(e) {
            e.preventDefault();
            preferencesModal.style.display = 'flex';
        });
    }

    // Attach event listener to settings link
    if (settingsLink && settingsModal) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            settingsModal.style.display = 'flex';
        });
    }

    // Handle genre selection in preferences modal
    if (genreSelectionDiv) {
        const movieGenres = [
            "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary"
        ];

        const closeButton = document.createElement('span');
        closeButton.textContent = '×';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', function() {
            preferencesModal.style.display = 'none';
        });
        if (preferencesModal.firstChild) {
            preferencesModal.insertBefore(closeButton, preferencesModal.firstChild);
        } else {
            preferencesModal.appendChild(closeButton);
        }

        movieGenres.forEach(genre => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = genre;
            checkbox.id = `genre-${genre.replace(' ', '-')}`;
            checkbox.className = 'genre-checkbox';

            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = genre;

            genreSelectionDiv.appendChild(checkbox);
            genreSelectionDiv.appendChild(label);
            genreSelectionDiv.appendChild(document.createElement('br'));
        });
        console.log("Genre checkboxes added to the preferences modal.");
    } else {
        console.log("genreSelectionDiv not found!");
    }

    // Display username if logged in (redundant with updateLoginState but kept for safety)
    if (loggedInUsername && usernameDisplay) {
        usernameDisplay.textContent = loggedInUsername;
    }

    // --- REMOVED LOGIN FORM SUBMISSION LOGIC FROM HERE ---
    // --- THIS LOGIC BELONGS IN login.js ---

    console.log("JavaScript file is running!");

    // Handle change password functionality (modal display only)
    if (changePasswordButton && changePasswordModal) {
        changePasswordButton.addEventListener('click', function() {
            if (settingsModal) settingsModal.style.display = 'none';
            changePasswordModal.style.display = 'flex';
        });
    }

    // Handle delete account functionality (modal display only)
    if (deleteAccountButton && deleteAccountModal) {
        deleteAccountButton.addEventListener('click', function() {
            if (settingsModal) settingsModal.style.display = 'none';
            deleteAccountModal.style.display = 'flex';
        });
    }

    // Handle closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // event listener
    const savePreferencesButton = document.getElementById('save-preferences-btn'); // Corrected ID

    if (savePreferencesButton) {
        savePreferencesButton.addEventListener('click', function() {
            const selectedGenres = Array.from(document.querySelectorAll('.genre-checkbox:checked'))
                .map(checkbox => checkbox.value);

            console.log("Selected Genres:", selectedGenres);

            // Store the selected genres in localStorage
            localStorage.setItem('userPreferences', JSON.stringify(selectedGenres));

            // Redirect to movies.html
            window.location.href = 'movies.html';
        });
    } else {
        console.log("Save Preferences button not found!");
    }
});
