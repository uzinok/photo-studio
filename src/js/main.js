window.onload = function () {
    let headerButtonJs = document.querySelector('.header__button--js');
    let nav = document.querySelector('.header__nav nav');
    let links = document.querySelectorAll('.header__nav-link');
    
    headerButtonJs.addEventListener('click', function() {
        let countLink = 0;
        if (nav.classList.contains('hidden-max-xl')) {
            nav.classList.remove('hidden-max-xl');

            setTimeout(function() {
                nav.classList.add('nav-visible');
            }, 10)

            document.addEventListener('keydown', function(e) {

                if (e.keyCode == 9) {
                    e.preventDefault
                    links[0].focus();
                    console.log(links);
                    countLink++
                }
                
            }, false)
        } else {
            nav.classList.remove('nav-visible');
            setTimeout(function() {
                nav.classList.add('hidden-max-xl');
            }, 500)
            
        }
        this.classList.toggle('open');
    })

};
