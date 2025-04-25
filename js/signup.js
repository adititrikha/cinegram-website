document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('.signup-form');
    const usernameInput = signupForm.querySelector('input[name="username"]'); // Get the username input
    const emailInput = signupForm.querySelector('input[type="email"]');
    const passwordInput = signupForm.querySelector('input[type="password"]');
    const confirmPasswordInput = signupForm.querySelector('input[name="confirm-password"]');
    const signupButton = signupForm.querySelector('button[type="submit"]');
    const signupMessageDiv = document.getElementById('signup-message');
  
    // Settings page modal functionality (added here)
    const changePasswordButton = document.getElementById('change-password-btn');
    const deleteAccountButton = document.getElementById('delete-account-btn');
    const changePasswordModal = document.getElementById('change-password-modal');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const settingsModal = document.getElementById('settings-modal');
    const closeButtons = document.querySelectorAll('.close-button');
  
    if (changePasswordButton && changePasswordModal) {
     changePasswordButton.addEventListener('click', function() {
      console.log("Change Password button clicked!"); // For debugging
      settingsModal.style.display = 'none';
      changePasswordModal.style.display = 'flex';
     });
    } else {
     console.log("Change Password button or modal not found on this page."); // For debugging
    }
  
    if (deleteAccountButton && deleteAccountModal) {
     deleteAccountButton.addEventListener('click', function() {
      console.log("Delete Account button clicked!"); // For debugging
      settingsModal.style.display = 'none';
      deleteAccountModal.style.display = 'flex';
     });
    } else {
     console.log("Delete Account button or modal not found on this page."); // For debugging
    }
  
    closeButtons.forEach(button => {
     button.addEventListener('click', function() {
      const modal = button.closest('.modal');
      if (modal) {
       modal.style.display = 'none';
      }
     });
    });
    // End of settings page modal functionality
  
    if (signupButton) {
     signupButton.addEventListener('click', function(event) {
      event.preventDefault();
  
      const username = usernameInput.value.trim(); // Get the username
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : password;
  
      if (!username || !email || !password) { // Validate username as well
       displayMessage('Please enter your name, email, and password.', true);
       return;
      }
  
      if (password !== confirmPassword) {
       displayMessage('Passwords do not match.', true);
       return;
      }
  
      fetch('http://localhost:3000/register', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({ username: username, email: email, password: password }), // Send username
      })
      .then(response => {
       if (!response.ok) {
        return response.json().then(errorData => {
         throw new Error(errorData.error || 'Signup failed. Please try again.');
        });
       }
       return response.json();
      })
      .then(data => {
       displayMessage(data.message, false);
       setTimeout(() => {
        window.location.href = 'login.html';
       }, 1500);
      })
      .catch((error) => {
       console.error('Error during signup:', error);
       let displayError = 'An error occurred during signup.';
       if (error.message && error.message.includes('UNIQUE constraint failed: users.email')) {
        displayError = 'This email address is already registered. Please log in or use a different email.';
       } else if (error.message) {
        displayError = error.message;
       }
       displayMessage(displayError, true);
      });
     });
    }
  
    function displayMessage(message, isError) {
     if (signupMessageDiv) {
      signupMessageDiv.textContent = message;
      signupMessageDiv.className = isError ? 'error-message' : 'success-message';
     } else {
      alert(message);
     }
    }
   });