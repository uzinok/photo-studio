window.onload = function () {

    // no-JS
    var noJS = document.querySelectorAll('.no-JS');
    for (var i = 0; i < noJS.length; i++) {
        noJS[i].classList.remove('no-JS');
    }

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

        var sliderListWrap = slider.querySelector('.slider__list-wrap');
        var sliderList = slider.querySelector('.slider__list');
        var sliderItem = slider.querySelectorAll('.slider__item');
        var pagerButton = slider.querySelectorAll('.slider__pager-button');
        var count = sliderItem.length;
        createSlides(sliderItem, sliderList);
        var arrWidthSlide = [268, 450, 585, 624];
        var wSlide = 0;
        var arrBreakpointWidth = [768, 1024, 1450];
        var countActive = 1;
        var transitionDelay = 300;
        sliderList.style.transition = 'transform ' + transitionDelay + 'ms ease-out';

        wSlide = initSlider(sliderList, arrWidthSlide, arrBreakpointWidth, count, sliderListWrap, wSlide);

        window.addEventListener("resize", function () {
            windowResize();
        });

        var check;

        function windowResize() {
            clearTimeout(check);
            check = setTimeout(function () {
                wSlide = initSlider(sliderList, arrWidthSlide, arrBreakpointWidth, count, sliderListWrap, wSlide);
                countActive = drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList);
            }, 100);
        }

        for (var i = 0; i < pagerButton.length; i++) {
            pagerButton[i].addEventListener('click', function () {
                countActive = +this.getAttribute('data-count');
                countActive = drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList);
            });
        }

        slider.querySelector('.slider__prev').addEventListener('click', function () {
            countActive = countActive - 1;
            countActive = drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList);
        });

        slider.querySelector('.slider__next').addEventListener('click', function () {
            countActive = countActive + 1;
            countActive = drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList);
        });

        countActive = drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList);

    }

    function initSlider(sliderList, arrWidthSlide, arrBreakpointWidth, count, sliderListWrap, wSlide) {

        if (window.innerWidth < arrBreakpointWidth[0]) {
            wSlide = arrWidthSlide[0];
        } else if (window.innerWidth < arrBreakpointWidth[1]) {
            wSlide = arrWidthSlide[1];
        } else  if (window.innerWidth < arrBreakpointWidth[2]){
            wSlide = arrWidthSlide[2];
        } else {
            wSlide = arrWidthSlide[3];
        }

        setSliderWidth(sliderList, wSlide, count, sliderListWrap);
        return wSlide;
    }

    function setSliderWidth(sliderList, wSlide, count, sliderListWrap) {
        sliderList.style.width = (count + 4) * wSlide + 'px';

        if (wSlide == 268) {
            sliderListWrap.style.width = wSlide + 'px';
        } else {
            sliderListWrap.style.width = 100 + '%';
        }
    }

    function createSlides(sliderItem, sliderList) {

        var liFirst = document.createElement('li');
        liFirst.innerHTML = sliderItem[sliderItem.length - 1].innerHTML;
        liFirst.classList.add('slider__item');
        liFirst.setAttribute('data-count', 0);
        sliderList.insertBefore(liFirst, sliderItem[0]);

        // var liFirst1 = document.createElement('li');
        // liFirst1.innerHTML = sliderItem[sliderItem.length - 2].innerHTML;
        // liFirst1.classList.add('slider__item');
        // liFirst1.setAttribute('data-count', -1);
        // sliderList.insertBefore(liFirst1, liFirst);

        var liLast = document.createElement('li');
        liLast.innerHTML = sliderItem[0].innerHTML;
        liLast.classList.add('slider__item');
        liLast.setAttribute('data-count', sliderItem.length + 1);
        sliderList.appendChild(liLast);

        // var liLast1 = document.createElement('li');
        // liLast1.innerHTML = sliderItem[1].innerHTML;
        // liLast1.classList.add('slider__item');
        // liLast1.setAttribute('data-count', sliderItem.length + 2);
        // sliderList.appendChild(liLast1);

    }

    function drawSlider(countActive, pagerButton, sliderItem, slider, wSlide, sliderList) {
        if (slider.querySelector('.active')) {
            slider.querySelector('li.active').classList.remove('active');
            slider.querySelector('button.active').classList.remove('active');
            slider.querySelector('[tabindex="0"]').setAttribute('tabindex', "-1");
        }

        if (countActive == 0) {
            countActive = sliderItem.length;
            draw(sliderList);

        } else if (countActive == sliderItem.length + 1) {
            countActive = 1;
            draw(sliderList);
        } else {
            draw(sliderList);
        }

        function draw(sliderList) {

            setTransform (countActive, wSlide, sliderList);

            if (slider.querySelector('[style="transform: translate(-10px, 0px);"]')) {
                slider.querySelector('[style="transform: translate(-10px, 0px);"]').style.transform = '';
                slider.querySelector('[style="transform: translate(10px, 0px);"]').style.transform = '';
            }
            slider.querySelector('[data-count="' + (countActive - 1) + '"]').style.transform = 'translate(-10px, 0px)';
            slider.querySelector('[data-count="' + (countActive + 1) + '"]').style.transform = 'translate(10px, 0px)';
            sliderItem[countActive - 1].style.transform = 'translate(0, -20px)';
            sliderItem[countActive - 1].classList.add('active');
            pagerButton[countActive - 1].classList.add('active');
            sliderItem[countActive - 1].querySelector('a').setAttribute('tabindex', "0");
        }

        return countActive;
    }

    function setTransform (countActive, wSlide, sliderList) {
        var transform = 0;
        if(wSlide == 268) {
            transform =  countActive*wSlide;
        } else if(wSlide == 268) {
            transform =  countActive*wSlide + wSlide/2 - (window.innerWidth/2 - wSlide) - wSlide;
        } else if(wSlide == 624) {
            transform =  countActive*wSlide + wSlide/2 - (1450/2 - wSlide) - wSlide;
        } else {
            transform =  countActive*wSlide + wSlide/2 - (window.innerWidth/2 - wSlide) - wSlide;
        }

        sliderList.style.transform = 'translate(-' + transform + 'px, 0)';

    }
};