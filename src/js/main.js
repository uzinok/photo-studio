window.onload = function () {
    let headerButtonJs = document.querySelector('.header__button--js');
    let nav = document.querySelector('.header__nav nav');
    
    headerButtonJs.addEventListener('click', function() {
        nav.classList.toggle('nav-visible');
        this.classList.toggle('open');
    })
};
