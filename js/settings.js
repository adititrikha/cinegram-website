// js/settings.js

document.addEventListener('DOMContentLoaded', function() {
    const deleteAccountButton = document.getElementById('delete-account-btn');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete-account-btn');
    const cancelDeleteButton = document.getElementById('cancel-delete-account-btn');
    const closeButton = document.querySelector('#delete-account-modal .close-button'); // Corrected selector

    // --- Show the Modal ---
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', function() {
            deleteAccountModal.style.display = 'block';
        });
    } else {
        console.error('Delete Account button not found!');
    }

    // --- Handle Confirm (Yes, Delete) ---
    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function() {
            console.log('Confirming account deletion...');

            // **IMPORTANT: Replace with your actual API call to delete the account**
            // Example:
            fetch('/api/users/me', { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error(errorData.error || 'Error deleting account');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Account deleted:', data);
                    // Clear user data from localStorage
                    localStorage.removeItem('userAuthToken');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('cinegram_mylist');
                    localStorage.removeItem('userPreferences');

                    // Redirect to login page
                    window.location.href = 'login.html';
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    alert('Failed to delete account. Please try again.'); // Simple error message
                })
                .finally(() => {
                    deleteAccountModal.style.display = 'none'; // Hide modal after attempt
                });
        });
    } else {
        console.warn('Confirm Delete Account button not found!');
    }

    // --- Handle Cancel (No, Cancel) ---
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    } else {
        console.warn('Cancel Delete Account button not found!');
    }

    // --- Handle Close (X) ---
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    } else {
        console.warn('Close button not found in delete account modal!');
    }
});