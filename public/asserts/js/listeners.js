/**
 * Listeners that will be used during display
 */

window.addEventListener('scroll', () => {
    if (window.scrollY >= document.getElementById('abstract').clientHeight) {
        document.getElementById('nav').setAttribute('style', 'opacity: 1; animation: Nav-bar-in 0.3s linear;');
        document.getElementById('abstract').setAttribute('style', 'display: none;');
    }
});

window.addEventListener('click', () => {

});
