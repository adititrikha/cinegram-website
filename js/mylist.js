document.addEventListener('DOMContentLoaded', function() {
    // Check for user authentication
    const authToken = localStorage.getItem('userAuthToken');
    const userName = localStorage.getItem('userName');
    const signinLink = document.getElementById('signin-link');
    const loggedInUser = document.getElementById('logged-in-user');
    const usernamePlaceholder = document.getElementById('username-placeholder');
    const userDropdown = document.getElementById('user-dropdown');
    const signoutLink = document.getElementById('signout-link');
    const myListMoviesContainer = document.getElementById('my-list-movies');
    const emptyMessage = document.getElementById('empty-message');
    const clearMylistButton = document.getElementById('clear-mylist-button');
    const numPlaceholders = document.querySelectorAll('.movie-placeholder').length; // Get number of placeholders

    if (authToken) {
        console.log('User is signed in as:', userName);
        if (signinLink) signinLink.style.display = 'none';
        if (loggedInUser) loggedInUser.style.display = 'block';
        if (usernamePlaceholder) usernamePlaceholder.textContent = userName;
    } else {
        console.log('User is not signed in');
        if (signinLink) signinLink.style.display = 'block';
        if (loggedInUser) loggedInUser.style.display = 'none';
        window.location.href = 'login.html';
    }

    // Function to display the My List with placeholders
    function displayMylist() {
        // Clear all placeholders first
        myListMoviesContainer.innerHTML = '';
        for (let i = 0; i < numPlaceholders; i++) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('movie-placeholder');
            myListMoviesContainer.appendChild(placeholder);
        }

        let myList = JSON.parse(localStorage.getItem('cinegram_mylist')) || [];

        if (myList.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            const placeholders = document.querySelectorAll('.movie-placeholder'); // Get placeholders again

            myList.forEach((movie, index) => {
                if (index < placeholders.length) {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <img src="${movie.image}" alt="${movie.title}">
                        <div class="movie-info">
                            <h3>${movie.title}</h3>
                            <button class="remove-button" data-id="${movie.id}">Remove</button>
                        </div>
                    `;
                    placeholders[index].classList.remove('movie-placeholder'); // Remove placeholder class
                    placeholders[index].appendChild(movieCard);
                }
            });
        }
    }

    displayMylist(); // Initial display

    // Event listener for the "Clear All" button
    if (clearMylistButton) {
        clearMylistButton.addEventListener('click', function() {
            localStorage.removeItem('cinegram_mylist');
            displayMylist(); // Re-render the empty list
        });
    }

    // Add event listener for remove buttons using event delegation
    myListMoviesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-button')) {
            const movieIdToRemove = event.target.getAttribute('data-id');
            let myList = JSON.parse(localStorage.getItem('cinegram_mylist')) || [];
            myList = myList.filter(m => m.id !== movieIdToRemove);
            localStorage.setItem('cinegram_mylist', JSON.stringify(myList));
            displayMylist(); // Re-render the list
        }
    });

    // User dropdown functionality
    if (usernamePlaceholder) {
        usernamePlaceholder.addEventListener('click', function() {
            userDropdown.style.display = (userDropdown.style.display === 'none' || userDropdown.style.display === '') ? 'block' : 'none';
        });
    }

    if (signoutLink) {
        signoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('preferencesSet');
            localStorage.removeItem('userAuthToken');
            window.location.href = 'login.html';
        });
    }

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (userDropdown && !userDropdown.contains(event.target) && event.target !== usernamePlaceholder) {
            userDropdown.style.display = 'none';
        }
    });
});