document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.movie-info .play-button');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank'); // Open in a new tab
            } else {
                alert('No link provided for this movie.');
            }
        });
    });
});