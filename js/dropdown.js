document.addEventListener('DOMContentLoaded', function() {
    const usernamePlaceholder = document.getElementById('username-placeholder');
    const userDropdown = document.getElementById('user-dropdown');
    const signoutLink = document.getElementById('signout-link');

    if (usernamePlaceholder) {
        usernamePlaceholder.addEventListener('click', function() {
            if (userDropdown.style.display === 'none' || userDropdown.style.display === '') {
                userDropdown.style.display = 'block';
            } else {
                userDropdown.style.display = 'none';
            }
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
