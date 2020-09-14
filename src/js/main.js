window.onload = function () {

    // no-JS
    var noJS = document.querySelectorAll('.no-JS');
    noJS.forEach(function (element) {
        element.classList.remove('no-JS');
    });

    // nav
    var headerButtonJs = document.querySelector('.header__button--js');
    var nav = document.querySelector('.header__nav nav');

    headerButtonJs.addEventListener('click', function () {
        if (nav.classList.contains('nav-visible')) {
            nav.classList.remove('nav-visible');
            setTimeout(function () {
                nav.classList.add('hidden-max-xl');
                headerButtonJs.classList.remove('open');
            }, 500);
        } else {
            nav.classList.remove('hidden-max-xl');

            setTimeout(function () {
                nav.classList.add('nav-visible');
                headerButtonJs.classList.add('open');
            }, 10);
        }
    });

    // slider

    slider(document.querySelector('.slider'));

    function slider(slider) {
        console.log(slider);
    }
};